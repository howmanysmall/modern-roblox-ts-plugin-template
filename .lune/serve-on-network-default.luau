--!optimize 2
--!strict
--[=[ lunar
	about = "Serves in a way that allows for connecting from a separate computer."
]=]

local Chalk = require("@packages/Chalk")
local Execute = require("@utilities/Execute")
local LuauPolyfill = require("@packages/LuauPolyfill")
local process = require("@lune/process")

local String = LuauPolyfill.String
local console = LuauPolyfill.console

local BOLD_BLUE = Chalk.Bold .. Chalk.Ansi256(39)

local ipConfiguration = Execute({"ipconfig"}):Assert()
local byLines = string.split(ipConfiguration.stdout, "\n")

local foundIp: string? = nil
local isObserving = false
for index, line in byLines do
	line = String.trimEnd(line)
	local lowerLine = string.lower(line)

	if string.find(lowerLine, "wireless lan adapter wi-fi:", 1, true) then
		isObserving = true
	elseif line == "" then
		local previous = byLines[index - 1]
		if previous and not string.find(string.lower(previous), "wireless lan adapter wi-fi:", 1, true) then
			isObserving = false
		end
	end

	if not isObserving then
		continue
	end

	local address = string.match(lowerLine, "^%s*ipv4 address.*: (.+)$")
	if not address then
		continue
	end

	foundIp = address
	break
end

if not foundIp then
	console.error("Was not able to find any IPv4 addresses?")
	process.exit(1)
	return
end

console.log(`Most likely serving at {BOLD_BLUE(foundIp)}`)
Execute({"rojo", "serve", "--address", "0.0.0.0", "default.project.json"}, {
	stdio = "inherit";
}):Assert()
