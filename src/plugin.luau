--!optimize 2
--!strict

local plugin = script:FindFirstAncestorWhichIsA("Plugin") or PluginManager():CreatePlugin()
return plugin
