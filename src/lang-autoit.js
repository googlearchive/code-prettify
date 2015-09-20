/**
 * @license
 * Copyright (C) 20015 Jonathan Bennett.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for AutoIt.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code inside an HTML tag like
 *     <pre class="prettyprint lang-autoit">
 *     </pre>
 *
 * @author jon@autoitscirpt.com
 *
 * @see https://www.autoitscript.com
 */

// AutoIt functions use "fun" styles with "pln" for stylesheets that don't style fun
var PR_FUNCTION = 'fun pln';

// AutoIt functions use "var" styles with "pln" for stylesheets that don't style var
var PR_VARIABLE = 'var pln';

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         //
         // Shortcut patterns - must start with a known char
         //

         // $variable
         [PR_VARIABLE, /^\$[A-Za-z0-9_\-]+/, null, "$"],

         // @Macro
         [PR['PR_TYPE'], /^\@[A-Za-z0-9_\-]+/, null, "@"],

         // Whitespaces: space, tab, carriage return, line feed, line tab, form-feed, non-break space
         [PR.PR_PLAIN, /^[ \t\r\n\v\f\xA0]+/, null, " \t\r\n\u000b\u000c\u00a0"],

         // A line comment that starts with ;
         [PR['PR_COMMENT'], /^;[^\r\n]*/, null, ';']
        ],

        [
         //
         // Patterns that will be tried if the shortcut ones fail. May have shortcuts.
         //
         
         // Multiline comments
         [PR['PR_COMMENT'], /^\s*(?:#cs|#comments-start)[\s\S]+(?:#ce|#comments-end)/],

         // AutoIt3Wrapper Directives
         [PR['PR_KEYWORD'], /^\s*#AutoIt3Wrapper[a-z0-9_]*/i],

         // AutoIt Regions - Highlights until the end of the line
         [PR['PR_KEYWORD'], /^\s*(?:#EndRegion|#Region).*/i, null],
         
         // AutoIt accepts single and double quotes
         [PR.PR_STRING, /^'(?:[^']|'')*'/, "'"],  // '
         [PR.PR_STRING, /^"(?:[^"]|"")*"/, '"'],  // "

         // AutoIt keywords
         [PR['PR_KEYWORD'], /^(?:And|ByRef|Case|Const|ContinueCase|ContinueLoop|Default|Dim|Do|Else|ElseIf|EndFunc|EndIf|EndSelect|EndSwitch|EndWith|Enum|Exit|ExitLoop|False|For|Func|Global|If|In|Local|Next|Not|Null|Or|ReDim|Return|Select|Static|Step|Switch|Then|To|True|Until|Volatile|WEnd|While|With|#ce|#comments-end|#comments-start|#cs|#include|#include-once|#NoTrayIcon|#OnAutoItStartRegister|#RequireAdmin|#EndRegion|#forcedef|#forceref|#ignorefunc|#pragma|#Region|)\b/i, null],

         // AutoIt functions
         [PR_FUNCTION, /^(?:Abs|ACos|AdlibRegister|AdlibUnRegister|Asc|AscW|ASin|Assign|ATan|AutoItSetOption|AutoItWinGetTitle|AutoItWinSetTitle|Beep|Binary|BinaryLen|BinaryMid|BinaryToString|BitAND|BitNOT|BitOR|BitRotate|BitShift|BitXOR|BlockInput|Break|Call|CDTray|Ceiling|Chr|ChrW|ClipGet|ClipPut|ConsoleRead|ConsoleWrite|ConsoleWriteError|ControlClick|ControlCommand|ControlDisable|ControlEnable|ControlFocus|ControlGetFocus|ControlGetHandle|ControlGetPos|ControlGetText|ControlHide|ControlListView|ControlMove|ControlSend|ControlSetText|ControlShow|ControlTreeView|Cos|Dec|DirCopy|DirCreate|DirGetSize|DirMove|DirRemove|DllCall|DllCallAddress|DllCallbackFree|DllCallbackGetPtr|DllCallbackRegister|DllClose|DllOpen|DllStructCreate|DllStructGetData|DllStructGetPtr|DllStructGetSize|DllStructSetData|DriveGetDrive|DriveGetFileSystem|DriveGetLabel|DriveGetSerial|DriveGetType|DriveMapAdd|DriveMapDel|DriveMapGet|DriveSetLabel|DriveSpaceFree|DriveSpaceTotal|DriveStatus|EnvGet|EnvSet|EnvUpdate|Eval|Execute|Exp|FileChangeDir|FileClose|FileCopy|FileCreateNTFSLink|FileCreateShortcut|FileDelete|FileExists|FileFindFirstFile|FileFindNextFile|FileFlush|FileGetAttrib|FileGetEncoding|FileGetLongName|FileGetPos|FileGetShortcut|FileGetShortName|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileOpen|FileOpenDialog|FileRead|FileReadLine|FileReadToArray|FileRecycle|FileRecycleEmpty|FileSaveDialog|FileSelectFolder|FileSetAttrib|FileSetEnd|FileSetPos|FileSetTime|FileWrite|FileWriteLine|Floor|FtpSetProxy|FuncName|GUICreate|GUICtrlCreateAvi|GUICtrlCreateButton|GUICtrlCreateCheckbox|GUICtrlCreateCombo|GUICtrlCreateContextMenu|GUICtrlCreateDate|GUICtrlCreateDummy|GUICtrlCreateEdit|GUICtrlCreateGraphic|GUICtrlCreateGroup|GUICtrlCreateIcon|GUICtrlCreateInput|GUICtrlCreateLabel|GUICtrlCreateList|GUICtrlCreateListView|GUICtrlCreateListViewItem|GUICtrlCreateMenu|GUICtrlCreateMenuItem|GUICtrlCreateMonthCal|GUICtrlCreateObj|GUICtrlCreatePic|GUICtrlCreateProgress|GUICtrlCreateRadio|GUICtrlCreateSlider|GUICtrlCreateTab|GUICtrlCreateTabItem|GUICtrlCreateTreeView|GUICtrlCreateTreeViewItem|GUICtrlCreateUpdown|GUICtrlDelete|GUICtrlGetHandle|GUICtrlGetState|GUICtrlRead|GUICtrlRecvMsg|GUICtrlRegisterListViewSort|GUICtrlSendMsg|GUICtrlSendToDummy|GUICtrlSetBkColor|GUICtrlSetColor|GUICtrlSetCursor|GUICtrlSetData|GUICtrlSetDefBkColor|GUICtrlSetDefColor|GUICtrlSetFont|GUICtrlSetGraphic|GUICtrlSetImage|GUICtrlSetLimit|GUICtrlSetOnEvent|GUICtrlSetPos|GUICtrlSetResizing|GUICtrlSetState|GUICtrlSetStyle|GUICtrlSetTip|GUIDelete|GUIGetCursorInfo|GUIGetMsg|GUIGetStyle|GUIRegisterMsg|GUISetAccelerators|GUISetBkColor|GUISetCoord|GUISetCursor|GUISetFont|GUISetHelp|GUISetIcon|GUISetOnEvent|GUISetState|GUISetStyle|GUIStartGroup|GUISwitch|Hex|HotKeySet|HttpSetProxy|HttpSetUserAgent|HWnd|InetClose|InetGet|InetGetInfo|InetGetSize|InetRead|IniDelete|IniRead|IniReadSection|IniReadSectionNames|IniRenameSection|IniWrite|IniWriteSection|InputBox|Int|IsAdmin|IsArray|IsBinary|IsBool|IsDeclared|IsDllStruct|IsFloat|IsFunc|IsHWnd|IsInt|IsKeyword|IsNumber|IsObj|IsPtr|IsString|Log|MemGetStats|Mod|MouseClick|MouseClickDrag|MouseDown|MouseGetCursor|MouseGetPos|MouseMove|MouseUp|MouseWheel|MsgBox|Number|ObjCreate|ObjCreateInterface|ObjEvent|ObjGet|ObjName|OnAutoItExitRegister|OnAutoItExitUnRegister|Ping|PixelChecksum|PixelGetColor|PixelSearch|ProcessClose|ProcessExists|ProcessGetStats|ProcessList|ProcessSetPriority|ProcessWait|ProcessWaitClose|ProgressOff|ProgressOn|ProgressSet|Ptr|Random|RegDelete|RegEnumKey|RegEnumVal|RegRead|RegWrite|Round|Run|RunAs|RunAsWait|RunWait|Send|SendKeepActive|SetError|SetExtended|ShellExecute|ShellExecuteWait|Shutdown|Sin|Sleep|SoundPlay|SoundSetWaveVolume|SplashImageOn|SplashOff|SplashTextOn|Sqrt|SRandom|StatusbarGetText|StderrRead|StdinWrite|StdioClose|StdoutRead|String|StringAddCR|StringCompare|StringFormat|StringFromASCIIArray|StringInStr|StringIsAlNum|StringIsAlpha|StringIsASCII|StringIsDigit|StringIsFloat|StringIsInt|StringIsLower|StringIsSpace|StringIsUpper|StringIsXDigit|StringLeft|StringLen|StringLower|StringMid|StringRegExp|StringRegExpReplace|StringReplace|StringReverse|StringRight|StringSplit|StringStripCR|StringStripWS|StringToASCIIArray|StringToBinary|StringTrimLeft|StringTrimRight|StringUpper|Tan|TCPAccept|TCPCloseSocket|TCPConnect|TCPListen|TCPNameToIP|TCPRecv|TCPSend|TCPShutdown|TCPStartup|TimerDiff|TimerInit|ToolTip|TrayCreateItem|TrayCreateMenu|TrayGetMsg|TrayItemDelete|TrayItemGetHandle|TrayItemGetState|TrayItemGetText|TrayItemSetOnEvent|TrayItemSetState|TrayItemSetText|TraySetClick|TraySetIcon|TraySetOnEvent|TraySetPauseIcon|TraySetState|TraySetToolTip|TrayTip|UBound|UDPBind|UDPCloseSocket|UDPOpen|UDPRecv|UDPSend|VarGetType|WinActivate|WinActive|WinClose|WinExists|WinFlash|WinGetCaretPos|WinGetClassList|WinGetClientSize|WinGetHandle|WinGetPos|WinGetProcess|WinGetState|WinGetText|WinGetTitle|WinKill|WinList|WinMenuSelectItem|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinSetOnTop|WinSetState|WinSetTitle|WinSetTrans|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive|Opt|UDPShutdown|UDPStartup)\b/i, null],

         // Literals .0, 0, 0.0 0E13
         [PR.PR_LITERAL, /^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?/i,  null, '0123456789'],

         // Hex numbers
         [PR['PR_LITERAL'], /^\b0x[0-9a-f]+/i],

         // Operators
         [PR.PR_PUNCTUATION, /^(?:=|\+=|-=|\*=|\/=|&|&=|\+|-|\*|\/|\^|=|==|<>|>|>=|<|<=)/, null],

         // Other punctuation
         [PR['PR_PUNCTUATION'], /^[()\[\]_]/],

         // Matching normal text if none of the previous regular expressions matched
         [PR['PR_PLAIN'], /^[A-Za-z0-9_\-\:]+/]

        ]),
    ['autoit', 'au3']);
