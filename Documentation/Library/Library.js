function getSidebar(page) {

    document.getElementsByClassName("sidebar")[0].innerHTML += sidebar;

    document.getElementById(page).classList.add("selected");

    var path = window.location.href.split("/");
    for (var p = path.length - 2; p >= 0; p--) {
        if (path[p].toLowerCase() == "library") {
            path.length = p + 1;
            path = path.join("/") + "/";
            break;
        }
    }

    document.getElementsByTagName("head")[0].innerHTML += "<base href='" + path + "' />";
}

function getMaps() {
    // Not future proof. Update this if the map class recieves any format changes.

    var req = new XMLHttpRequest();

    req.onload = function () {
        var page = this.responseText;

        var startIndex = page.indexOf("// Assault", page.indexOf("public class Map")) + 10;
        var endIndex = page.indexOf("/// <summary>", startIndex);

        var parse = page.substring(startIndex, endIndex);

        var table = "<table style=\"height: 500px; overflow-y: scroll; display: block; \"><tr><th>Map Name</th><th>Mode</th><th>Event</th></tr>";

        var maps = parse.split("\n");
        for (var i = 0; i < maps.length; i++) {
            var map = maps[i].trim();
            if (map.substring(0, 17) == "public static Map") {

                var name = map.substring(18, map.indexOf(" ", 18));

                var modeIndex = map.indexOf("Gamemode", 18) + 9;
                var mode = map.substring(modeIndex, map.indexOf(",", modeIndex));

                var eventIndex = map.indexOf("Event", modeIndex) + 6;
                var event = map.substring(eventIndex, map.indexOf(")", eventIndex));

                table += ("<tr><td>" + name + "</td><td>" + mode + "</td><td>" + event + "</td></tr>");
            }
        }

        table += "</table>";

        document.getElementById("mapList").innerHTML = table;
    }

    req.open('GET', "https://raw.githubusercontent.com/ItsDeltin/Overwatch-Custom-Game-Automation/master/CustomGameLib/CustomGameLib/Map.cs");
    req.send();
}

function getHeroSettings() {
    // Not future proof. Update this if SetHeroSettings recieves any format changes.

    var req = new XMLHttpRequest();

    req.onload = function () {
        var page = this.responseText;

        var table = "<table style=\"height: 500px; overflow-y: scroll; display: block; \"><tr><th>Setting</th><th>Type</th><th>Object Type</th></tr>";

        var parse = page.split("\n");

        for (var i = 0; i < parse.length; i++) {
            if (parse[i].length == 0)
                continue;

            if (parse[i][0] == "-") {
                table += "<tr style=\"background-color:#c6c6c6\"><td><strong style=\"margin-top:10px;\">" + parse[i].substring(1, parse[i].length) + "</strong></td><td></td><td></td></tr>";
            }
            else {
                var splitIndex = parse[i].indexOf(" ", 1);
                var setting = parse[i].substring(0, splitIndex);
                var type = parse[i].substring(splitIndex + 1, parse[i].length);

                table += "<tr><td>" + setting + "</td><td>" + type + "</td>";

                if (type == "value")
                    table += "<td>System.Int32</td>";
                else if (type == "toggle") {
                    table += "<td>System.Boolean</td>";
                }
                else if (type == "dropdown") {
                    table += "<td>System.Int32</td>"
                }

                table += "</tr>"
            }
        }

        table += "</table>";

        document.getElementById("heroSettingsTable").innerHTML = table;
    }

    req.open('GET', "https://raw.githubusercontent.com/ItsDeltin/Overwatch-Custom-Game-Automation/master/CustomGameLib/CustomGameLib/Resources/hero_settings.txt");
    req.send();
}

function toggleChildren(div) {
    var children = div.nextElementSibling.nextElementSibling;
    if (children.style.display == "none") {
        children.style.display = "block";
        div.innerHTML = "-";
    }
    else {
        children.style.display = "none";
        div.innerHTML = "+";
    }
}

function collapseAll() {
    var collapse = document.getElementsByClassName("childrenToggle");
    for (var i = 0; i < collapse.length; i++)
        if (collapse[i].nextElementSibling.nextElementSibling.style.display = "block")
            toggleChildren(collapse[i]);
}

function showAll() {
    var collapse = document.getElementsByClassName("childrenToggle");
    for (var i = 0; i < collapse.length; i++)
        if (collapse[i].nextElementSibling.nextElementSibling.style.display = "none")
            toggleChildren(collapse[i]);
}

var sidebar = "<div class=\"element\"><a href=\"GettingStarted.html\" id=\"GettingStarted\">Getting Started</a></div><hr /><a onclick=\"collapseAll()\">Collapse All</a> | <a onclick=\"showAll()\">Show All</a><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsnamespace\" id=\"Deltin.CustomGameAutomation\" href=\"Deltin.CustomGameAutomation.html\">Deltin.CustomGameAutomation</a><div class=\"sidebarSection\"><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"AI\" href=\"AI/AI.html\">AI</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"AI/AccurateIsAI(int)\" href=\"AI/AccurateIsAI(int).html\">AccurateIsAI(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/AddAI(AIHero,Difficulty,BotTeam,int)\" href=\"AI/AddAI(AIHero,Difficulty,BotTeam,int).html\">AddAI(AIHero, Difficulty, BotTeam, [int])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/CalibrateAIChecking()\" href=\"AI/CalibrateAIChecking().html\">CalibrateAIChecking()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/EditAI(int,AIHero,Difficulty)\" href=\"AI/EditAI(int,AIHero,Difficulty).html\">EditAI(int, AIHero, Difficulty)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/EditAI(int,AIHero)\" href=\"AI/EditAI(int,AIHero).html\">EditAI(int, AIHero)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/EditAI(int,Difficulty)\" href=\"AI/EditAI(int,Difficulty).html\">EditAI(int, Difficulty)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/GetAIDifficulty(int,bool)\" href=\"AI/GetAIDifficulty(int,bool).html\">GetAIDifficulty(int, [bool])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/GetAIDifficultyMarkup(int,string)\" href=\"AI/GetAIDifficultyMarkup(int,string).html\">GetAIDifficultyMarkup(int, string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/GetAISlots(bool)\" href=\"AI/GetAISlots(bool).html\">GetAISlots([bool])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/GetPlayerSlots(bool)\" href=\"AI/GetPlayerSlots(bool).html\">GetPlayerSlots([bool])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/IsAI(int,bool)\" href=\"AI/IsAI(int,bool).html\">IsAI(int, [bool])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/RemoveAllBotsAuto()\" href=\"AI/RemoveAllBotsAuto().html\">RemoveAllBotsAuto()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"AI/RemoveFromGameIfAI(int)\" href=\"AI/RemoveFromGameIfAI(int).html\">RemoveFromGameIfAI(int)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Chat\" href=\"Chat/Chat.html\">Chat</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Chat/JoinChannel(Channel)\" href=\"Chat/JoinChannel(Channel).html\">JoinChannel(Channel)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Chat/LeaveChannel(Channel)\" href=\"Chat/LeaveChannel(Channel).html\">LeaveChannel(Channel)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Chat/SendChatMessage(string)\" href=\"Chat/SendChatMessage(string).html\">SendChatMessage(string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Chat/SwapChannel(Channel)\" href=\"Chat/SwapChannel(Channel).html\">SwapChannel(Channel)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"ChatIdentity\" href=\"ChatIdentity/ChatIdentity.html\">ChatIdentity</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"ChatIdentity/CompareChatIdentities(ChatIdentity,ChatIdentity)\" href=\"ChatIdentity/CompareChatIdentities(ChatIdentity,ChatIdentity).html\">CompareChatIdentities(ChatIdentity, ChatIdentity)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"ChatIdentity/CompareChatIdentities(ChatIdentity)\" href=\"ChatIdentity/CompareChatIdentities(ChatIdentity).html\">CompareChatIdentities(ChatIdentity)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"ChatIdentity/Dispose()\" href=\"ChatIdentity/Dispose().html\">Dispose()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"CommandData\" href=\"CommandData/CommandData.html\">CommandData</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsproperty\" id=\"CommandData/Channel\" href=\"CommandData/Channel.html\">Channel</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CommandData/Command\" href=\"CommandData/Command.html\">Command</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CommandData/PlayerIdentity\" href=\"CommandData/PlayerIdentity.html\">PlayerIdentity</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"CommandExecuted\" href=\"CommandExecuted/CommandExecuted.html\">CommandExecuted</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"CommandExecuted(object,IntPtr)\" href=\"CommandExecuted/(object,IntPtr).html\">(object, IntPtr)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CommandExecuted/BeginInvoke(CommandData,AsyncCallback,object)\" href=\"CommandExecuted/BeginInvoke(CommandData,AsyncCallback,object).html\">BeginInvoke(CommandData, AsyncCallback, object)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CommandExecuted/EndInvoke(IAsyncResult)\" href=\"CommandExecuted/EndInvoke(IAsyncResult).html\">EndInvoke(IAsyncResult)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CommandExecuted/Invoke(CommandData)\" href=\"CommandExecuted/Invoke(CommandData).html\">Invoke(CommandData)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Commands\" href=\"Commands/Commands.html\">Commands</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Commands/GetSlotIdentity(int)\" href=\"Commands/GetSlotIdentity(int).html\">GetSlotIdentity(int)</a></div><div class=\"element\"><a class=\"vsfield\" id=\"Commands/Listen\" href=\"Commands/Listen.html\">Listen</a></div><div class=\"element\"><a class=\"vsfield\" id=\"Commands/ListenTo\" href=\"Commands/ListenTo.html\">ListenTo</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"CustomGame\" href=\"CustomGame/CustomGame.html\">CustomGame</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"CustomGame(CustomGameBuilder)\" href=\"CustomGame/(CustomGameBuilder).html\">([CustomGameBuilder])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/CreateOverwatchProcess(OverwatchProcessInfo)\" href=\"CustomGame/CreateOverwatchProcess(OverwatchProcessInfo).html\">CreateOverwatchProcess(OverwatchProcessInfo)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/DisableOverwatchWindowInput()\" href=\"CustomGame/DisableOverwatchWindowInput().html\">DisableOverwatchWindowInput()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/Dispose()\" href=\"CustomGame/Dispose().html\">Dispose()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/EnableOverwatchWindowInput()\" href=\"CustomGame/EnableOverwatchWindowInput().html\">EnableOverwatchWindowInput()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/GetCurrentOverwatchEvent()\" href=\"CustomGame/GetCurrentOverwatchEvent().html\">GetCurrentOverwatchEvent()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/GetGameState()\" href=\"CustomGame/GetGameState().html\">GetGameState()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/GetInvitedCount()\" href=\"CustomGame/GetInvitedCount().html\">GetInvitedCount()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/GetInvitedSlots()\" href=\"CustomGame/GetInvitedSlots().html\">GetInvitedSlots()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/GetSlots(SlotFlags)\" href=\"CustomGame/GetSlots(SlotFlags).html\">GetSlots(SlotFlags)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/InvitePlayer(string,InviteTeam)\" href=\"CustomGame/InvitePlayer(string,InviteTeam).html\">InvitePlayer(string, [InviteTeam])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/IsSlotBlue(int)\" href=\"CustomGame/IsSlotBlue(int).html\">IsSlotBlue(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/IsSlotInQueue(int)\" href=\"CustomGame/IsSlotInQueue(int).html\">IsSlotInQueue(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/IsSlotRed(int)\" href=\"CustomGame/IsSlotRed(int).html\">IsSlotRed(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/IsSlotSpectator(int)\" href=\"CustomGame/IsSlotSpectator(int).html\">IsSlotSpectator(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/IsSlotValid(int)\" href=\"CustomGame/IsSlotValid(int).html\">IsSlotValid(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/RestartGame()\" href=\"CustomGame/RestartGame().html\">RestartGame()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/SaveScreenshot(string)\" href=\"CustomGame/SaveScreenshot(string).html\">SaveScreenshot(string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/SendServerToLobby()\" href=\"CustomGame/SendServerToLobby().html\">SendServerToLobby()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/SetHeroRoster(ToggleAction,BotTeam,Hero[])\" href=\"CustomGame/SetHeroRoster(ToggleAction,BotTeam,Hero[]).html\">SetHeroRoster(ToggleAction, BotTeam, Hero[])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/SetHeroSettings(SetHero[])\" href=\"CustomGame/SetHeroSettings(SetHero[]).html\">SetHeroSettings(SetHero[])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/SetupOverwatchWindow()\" href=\"CustomGame/SetupOverwatchWindow().html\">SetupOverwatchWindow()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/StartGame()\" href=\"CustomGame/StartGame().html\">StartGame()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/StartGamemode()\" href=\"CustomGame/StartGamemode().html\">StartGamemode()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/ToggleMap(ToggleAction,Map[])\" href=\"CustomGame/ToggleMap(ToggleAction,Map[]).html\">ToggleMap(ToggleAction, Map[])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/ToggleMap(ModesEnabled,Event,ToggleAction,Map[])\" href=\"CustomGame/ToggleMap(ModesEnabled,Event,ToggleAction,Map[]).html\">ToggleMap(ModesEnabled, Event, ToggleAction, Map[])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"CustomGame/WaitForSlotUpdate(int)\" href=\"CustomGame/WaitForSlotUpdate(int).html\">WaitForSlotUpdate([int])</a></div><div class=\"element\"><a class=\"vsevent\" id=\"CustomGame/OnGameOver\" href=\"CustomGame/OnGameOver.html\">OnGameOver</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/BlueCount\" href=\"CustomGame/BlueCount.html\">BlueCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/BlueSlots\" href=\"CustomGame/BlueSlots.html\">BlueSlots</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/PlayerCount\" href=\"CustomGame/PlayerCount.html\">PlayerCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/PlayerSlots\" href=\"CustomGame/PlayerSlots.html\">PlayerSlots</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/QueueCount\" href=\"CustomGame/QueueCount.html\">QueueCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/QueueSlots\" href=\"CustomGame/QueueSlots.html\">QueueSlots</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/RedCount\" href=\"CustomGame/RedCount.html\">RedCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/RedSlots\" href=\"CustomGame/RedSlots.html\">RedSlots</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/SpectatorCount\" href=\"CustomGame/SpectatorCount.html\">SpectatorCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/SpectatorSlots\" href=\"CustomGame/SpectatorSlots.html\">SpectatorSlots</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/TotalPlayerCount\" href=\"CustomGame/TotalPlayerCount.html\">TotalPlayerCount</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"CustomGame/TotalPlayerSlots\" href=\"CustomGame/TotalPlayerSlots.html\">TotalPlayerSlots</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/AI\" href=\"CustomGame/AI.html\">AI</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/Chat\" href=\"CustomGame/Chat.html\">Chat</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/Commands\" href=\"CustomGame/Commands.html\">Commands</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/CurrentOverwatchEvent\" href=\"CustomGame/CurrentOverwatchEvent.html\">CurrentOverwatchEvent</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/Interact\" href=\"CustomGame/Interact.html\">Interact</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/ModesEnabled\" href=\"CustomGame/ModesEnabled.html\">ModesEnabled</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/Pause\" href=\"CustomGame/Pause.html\">Pause</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/PlayerInfo\" href=\"CustomGame/PlayerInfo.html\">PlayerInfo</a></div><div class=\"element\"><a class=\"vsconstant\" id=\"CustomGame/Queueid\" href=\"CustomGame/Queueid.html\">Queueid</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGame/Settings\" href=\"CustomGame/Settings.html\">Settings</a></div></div></div><div class=\"element\"><a class=\"vsclass\" id=\"CustomGameBase\" href=\"CustomGameBase/CustomGameBase.html\">CustomGameBase</a></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"CustomGameBuilder\" href=\"CustomGameBuilder/CustomGameBuilder.html\">CustomGameBuilder</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"CustomGameBuilder()\" href=\"CustomGameBuilder/().html\">()</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGameBuilder/DefaultKeys\" href=\"CustomGameBuilder/DefaultKeys.html\">DefaultKeys</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGameBuilder/OpenChatIsDefault\" href=\"CustomGameBuilder/OpenChatIsDefault.html\">OpenChatIsDefault</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGameBuilder/OverwatchHandle\" href=\"CustomGameBuilder/OverwatchHandle.html\">OverwatchHandle</a></div><div class=\"element\"><a class=\"vsfield\" id=\"CustomGameBuilder/ScreenshotMethod\" href=\"CustomGameBuilder/ScreenshotMethod.html\">ScreenshotMethod</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"DefaultKeys\" href=\"DefaultKeys/DefaultKeys.html\">DefaultKeys</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"DefaultKeys()\" href=\"DefaultKeys/().html\">()</a></div><div class=\"element\"><a class=\"vsfield\" id=\"DefaultKeys/OpenChat\" href=\"DefaultKeys/OpenChat.html\">OpenChat</a></div><div class=\"element\"><a class=\"vsfield\" id=\"DefaultKeys/OpenCustomGameLobbyKey\" href=\"DefaultKeys/OpenCustomGameLobbyKey.html\">OpenCustomGameLobbyKey</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"GameOverArgs\" href=\"GameOverArgs/GameOverArgs.html\">GameOverArgs</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"GameOverArgs/GetWinningTeam()\" href=\"GameOverArgs/GetWinningTeam().html\">GetWinningTeam()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Identity\" href=\"Identity/Identity.html\">Identity</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Identity/Dispose()\" href=\"Identity/Dispose().html\">Dispose()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Interact\" href=\"Interact/Interact.html\">Interact</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/MenuOptionMarkup(int,int,string,double)\" href=\"Interact/MenuOptionMarkup(int,int,string,double).html\">MenuOptionMarkup(int, int, string, [double])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/MenuOptionScan(int,Bitmap,int,int,double)\" href=\"Interact/MenuOptionScan(int,Bitmap,int,int,double).html\">MenuOptionScan(int, Bitmap, int, int, [double])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/Move(int,int)\" href=\"Interact/Move(int,int).html\">Move(int, int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/RemoveAllBots(int)\" href=\"Interact/RemoveAllBots(int).html\">RemoveAllBots(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/RemoveFromGame(int)\" href=\"Interact/RemoveFromGame(int).html\">RemoveFromGame(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapAll()\" href=\"Interact/SwapAll().html\">SwapAll()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapTeam(int)\" href=\"Interact/SwapTeam(int).html\">SwapTeam(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapToBlue(int)\" href=\"Interact/SwapToBlue(int).html\">SwapToBlue(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapToNeutral(int)\" href=\"Interact/SwapToNeutral(int).html\">SwapToNeutral(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapToRed(int)\" href=\"Interact/SwapToRed(int).html\">SwapToRed(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Interact/SwapToSpectators(int)\" href=\"Interact/SwapToSpectators(int).html\">SwapToSpectators(int)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"InvalidSetheroException\" href=\"InvalidSetheroException/InvalidSetheroException.html\">InvalidSetheroException</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"InvalidSetheroException(string)\" href=\"InvalidSetheroException/(string).html\">(string)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"InvalidSlotException\" href=\"InvalidSlotException/InvalidSlotException.html\">InvalidSlotException</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"InvalidSlotException(string)\" href=\"InvalidSlotException/(string).html\">(string)</a></div><div class=\"element\"><a class=\"\" id=\"InvalidSlotException(int)\" href=\"InvalidSlotException/(int).html\">(int)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"ListenTo\" href=\"ListenTo/ListenTo.html\">ListenTo</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"ListenTo(string,bool,bool,CommandExecuted)\" href=\"ListenTo/(string,bool,bool,CommandExecuted).html\">(string, bool, bool, CommandExecuted)</a></div><div class=\"element\"><a class=\"vsproperty\" id=\"ListenTo/Command\" href=\"ListenTo/Command.html\">Command</a></div><div class=\"element\"><a class=\"vsfield\" id=\"ListenTo/Callback\" href=\"ListenTo/Callback.html\">Callback</a></div><div class=\"element\"><a class=\"vsfield\" id=\"ListenTo/Listen\" href=\"ListenTo/Listen.html\">Listen</a></div><div class=\"element\"><a class=\"vsfield\" id=\"ListenTo/RegisterProfile\" href=\"ListenTo/RegisterProfile.html\">RegisterProfile</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"LoginFailedException\" href=\"LoginFailedException/LoginFailedException.html\">LoginFailedException</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"LoginFailedException(string)\" href=\"LoginFailedException/(string).html\">(string)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Map\" href=\"Map/Map.html\">Map</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Map/Equals(Map)\" href=\"Map/Equals(Map).html\">Equals(Map)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Map/GetMaps()\" href=\"Map/GetMaps().html\">GetMaps()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Map/GetMapsInGamemode(Gamemode,Event)\" href=\"Map/GetMapsInGamemode(Gamemode,Event).html\">GetMapsInGamemode(Gamemode, [Event])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Map/MapIDFromName(string)\" href=\"Map/MapIDFromName(string).html\">MapIDFromName(string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Map/MapNameFromID(Map)\" href=\"Map/MapNameFromID(Map).html\">MapNameFromID(Map)</a></div><div class=\"element\"><a class=\"vsfield\" id=\"Map/GameEvent\" href=\"Map/GameEvent.html\">GameEvent</a></div><div class=\"element\"><a class=\"vsfield\" id=\"Map/GameMode\" href=\"Map/GameMode.html\">GameMode</a></div><div class=\"element\"><a class=\"vsfield\" id=\"Map/MapName\" href=\"Map/MapName.html\">MapName</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"MissingOverwatchProcessException\" href=\"MissingOverwatchProcessException/MissingOverwatchProcessException.html\">MissingOverwatchProcessException</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"MissingOverwatchProcessException(string)\" href=\"MissingOverwatchProcessException/(string).html\">(string)</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"ModesEnabled\" href=\"ModesEnabled/ModesEnabled.html\">ModesEnabled</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"ModesEnabled()\" href=\"ModesEnabled/().html\">()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"OverwatchProcessInfo\" href=\"OverwatchProcessInfo/OverwatchProcessInfo.html\">OverwatchProcessInfo</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"OverwatchProcessInfo(string,string,string)\" href=\"OverwatchProcessInfo/(string,string,string).html\">(string, string, [string])</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/Authenticator\" href=\"OverwatchProcessInfo/Authenticator.html\">Authenticator</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/AutomaticallyCreateCustomGame\" href=\"OverwatchProcessInfo/AutomaticallyCreateCustomGame.html\">AutomaticallyCreateCustomGame</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/CloseOverwatchProcessOnFailure\" href=\"OverwatchProcessInfo/CloseOverwatchProcessOnFailure.html\">CloseOverwatchProcessOnFailure</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/OverwatchExecutableFilePath\" href=\"OverwatchProcessInfo/OverwatchExecutableFilePath.html\">OverwatchExecutableFilePath</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/OverwatchSettingsFilePath\" href=\"OverwatchProcessInfo/OverwatchSettingsFilePath.html\">OverwatchSettingsFilePath</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/Password\" href=\"OverwatchProcessInfo/Password.html\">Password</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/ScreenshotMethod\" href=\"OverwatchProcessInfo/ScreenshotMethod.html\">ScreenshotMethod</a></div><div class=\"element\"><a class=\"vsfield\" id=\"OverwatchProcessInfo/Username\" href=\"OverwatchProcessInfo/Username.html\">Username</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Pause\" href=\"Pause/Pause.html\">Pause</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Pause/IsPaused()\" href=\"Pause/IsPaused().html\">IsPaused()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Pause/PauseGame()\" href=\"Pause/PauseGame().html\">PauseGame()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Pause/TogglePause()\" href=\"Pause/TogglePause().html\">TogglePause()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Pause/UnpauseGame()\" href=\"Pause/UnpauseGame().html\">UnpauseGame()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"PlayerIdentity\" href=\"PlayerIdentity/PlayerIdentity.html\">PlayerIdentity</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerIdentity/ComparePlayerIdentities(PlayerIdentity,PlayerIdentity)\" href=\"PlayerIdentity/ComparePlayerIdentities(PlayerIdentity,PlayerIdentity).html\">ComparePlayerIdentities(PlayerIdentity, PlayerIdentity)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerIdentity/ComparePlayerIdentities(PlayerIdentity)\" href=\"PlayerIdentity/ComparePlayerIdentities(PlayerIdentity).html\">ComparePlayerIdentities(PlayerIdentity)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerIdentity/Dispose()\" href=\"PlayerIdentity/Dispose().html\">Dispose()</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"PlayerInfo\" href=\"PlayerInfo/PlayerInfo.html\">PlayerInfo</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/GetHero(int)\" href=\"PlayerInfo/GetHero(int).html\">GetHero(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/GetHero(int,HeroResultInfo)\" href=\"PlayerInfo/GetHero(int,HeroResultInfo).html\">GetHero(int, out HeroResultInfo)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/GetHeroMarkup(int,string)\" href=\"PlayerInfo/GetHeroMarkup(int,string).html\">GetHeroMarkup(int, string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/GetQueueTeam(int)\" href=\"PlayerInfo/GetQueueTeam(int).html\">GetQueueTeam(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/IsHeroChosen(int)\" href=\"PlayerInfo/IsHeroChosen(int).html\">IsHeroChosen(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/IsUltimateReady(int,bool)\" href=\"PlayerInfo/IsUltimateReady(int,bool).html\">IsUltimateReady(int, [bool])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/MaxPlayerCount()\" href=\"PlayerInfo/MaxPlayerCount().html\">MaxPlayerCount()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/ModeratorSlot()\" href=\"PlayerInfo/ModeratorSlot().html\">ModeratorSlot()</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/PlayerExists(string)\" href=\"PlayerInfo/PlayerExists(string).html\">PlayerExists(string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"PlayerInfo/PlayersDead(bool)\" href=\"PlayerInfo/PlayersDead(bool).html\">PlayersDead([bool])</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"SetHero\" href=\"SetHero/SetHero.html\">SetHero</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"\" id=\"SetHero(Hero,BotTeam,string[],object[])\" href=\"SetHero/(Hero,BotTeam,string[],object[]).html\">(Hero?, BotTeam, string[], object[])</a></div><div class=\"element\"><a class=\"vsfield\" id=\"SetHero/Hero\" href=\"SetHero/Hero.html\">Hero</a></div><div class=\"element\"><a class=\"vsfield\" id=\"SetHero/Set\" href=\"SetHero/Set.html\">Set</a></div><div class=\"element\"><a class=\"vsfield\" id=\"SetHero/SetTo\" href=\"SetHero/SetTo.html\">SetTo</a></div><div class=\"element\"><a class=\"vsfield\" id=\"SetHero/Team\" href=\"SetHero/Team.html\">Team</a></div></div></div><div class=\"element\"> <div class=\"childrenToggle\" onclick=\"toggleChildren(this)\">-</div><a class=\"vsclass\" id=\"Settings\" href=\"Settings/Settings.html\">Settings</a><div class=\"sidebarSection\"><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/LoadPreset(int,int)\" href=\"Settings/LoadPreset(int,int).html\">LoadPreset(int, [int])</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/SetGameName(string)\" href=\"Settings/SetGameName(string).html\">SetGameName(string)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/SetJoinSetting(Join)\" href=\"Settings/SetJoinSetting(Join).html\">SetJoinSetting(Join)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/SetMaxPlayers(int,int,int,int)\" href=\"Settings/SetMaxPlayers(int,int,int,int).html\">SetMaxPlayers(int?, int?, int?, int?)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/SetNumPresets(int)\" href=\"Settings/SetNumPresets(int).html\">SetNumPresets(int)</a></div><div class=\"element\"><a class=\"vsmethod\" id=\"Settings/SetTeamName(PlayerTeam,string)\" href=\"Settings/SetTeamName(PlayerTeam,string).html\">SetTeamName(PlayerTeam, string)</a></div></div></div><div class=\"element\"><a class=\"vsenum\" id=\"AIHero\" href=\"AIHero.html\">AIHero</a></div><div class=\"element\"><a class=\"vsenum\" id=\"BotTeam\" href=\"BotTeam.html\">BotTeam</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Channel\" href=\"Channel.html\">Channel</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Difficulty\" href=\"Difficulty.html\">Difficulty</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Event\" href=\"Event.html\">Event</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Gamemode\" href=\"Gamemode.html\">Gamemode</a></div><div class=\"element\"><a class=\"vsenum\" id=\"GameState\" href=\"GameState.html\">GameState</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Hero\" href=\"Hero.html\">Hero</a></div><div class=\"element\"><a class=\"vsenum\" id=\"HeroResultInfo\" href=\"HeroResultInfo.html\">HeroResultInfo</a></div><div class=\"element\"><a class=\"vsenum\" id=\"InviteTeam\" href=\"InviteTeam.html\">InviteTeam</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Join\" href=\"Join.html\">Join</a></div><div class=\"element\"><a class=\"vsenum\" id=\"LobbyTeam\" href=\"LobbyTeam.html\">LobbyTeam</a></div><div class=\"element\"><a class=\"vsenum\" id=\"PlayerTeam\" href=\"PlayerTeam.html\">PlayerTeam</a></div><div class=\"element\"><a class=\"vsenum\" id=\"QueueTeam\" href=\"QueueTeam.html\">QueueTeam</a></div><div class=\"element\"><a class=\"vsenum\" id=\"ScreenshotMethod\" href=\"ScreenshotMethod.html\">ScreenshotMethod</a></div><div class=\"element\"><a class=\"vsenum\" id=\"SlotFlags\" href=\"SlotFlags.html\">SlotFlags</a></div><div class=\"element\"><a class=\"vsenum\" id=\"Team\" href=\"Team.html\">Team</a></div><div class=\"element\"><a class=\"vsenum\" id=\"ToggleAction\" href=\"ToggleAction.html\">ToggleAction</a></div></div></div>";