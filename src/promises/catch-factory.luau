--!optimize 2

local function concat(...: unknown)
	local length = select("#", ...)
	if length == 0 then
		return ""
	end

	if length == 1 then
		return tostring(...)
	end

	if length == 2 then
		local first, second = ...
		return tostring(first) .. " " .. tostring(second)
	end

	if length == 3 then
		local first, second, third = ...
		return tostring(first) .. " " .. tostring(second) .. " " .. tostring(third)
	end

	local array = table.create(length)
	for index = 1, length do
		array[index] = tostring(select(index, ...))
	end

	return table.concat(array, " ")
end

local function catchFactory(functionName: string, logFunction: nil | (...any) -> ())
	local trueLogFunction: (...any) -> () = logFunction or warn
	return function(...)
		trueLogFunction(string.format("Error in function %*: %*", functionName, concat(...)))
	end
end

return catchFactory
