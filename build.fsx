// include Fake lib
#r @"packages/FAKE/tools/FakeLib.dll"
open Fake


Target "Prepare Angular" (fun _ ->
  let npm = tryFindFileOnPath(if isUnix then "npm" else "npm.cmd")
  trace((string)npm)
  let errCode = match npm with
                  | Some g -> Shell.Exec((string)npm, "install", "client")
                  | None -> -1
  ()
)

Target "Build Angular" (fun _ ->
  let ng = tryFindFileOnPath(if isUnix then "ng" else "ng.cmd")
  trace((string)ng)
  let errCode = match ng with
                  | Some g -> Shell.Exec((string)ng, "build", "client")
                  | None -> -1
  ()
)



Target "Prepare dotnet" (fun _ ->
  let dotnet = tryFindFileOnPath(if isUnix then "dotnet" else "dotnet.exe")
  trace((string)dotnet)
  let errCode = match dotnet with
                  | Some g -> Shell.Exec((string)dotnet, "restore server/project.json", ".")
                  | None -> -1
  ()
)


Target "Build dotnet" (fun _ ->
  let dotnet = tryFindFileOnPath(if isUnix then "dotnet" else "dotnet.exe")
  trace((string)dotnet)
  let errCode = match dotnet with
                  | Some g -> Shell.Exec((string)dotnet, "publish server/project.json", ".")
                  | None -> -1
  ()
)



// Default target
Target "Default" (fun _ ->
  trace "Hello World from FAKE"
)

"Prepare Angular"
  ==> "Build Angular"
  ==> "Prepare dotnet"
  ==> "Build dotnet"
  ==> "Default"


// start build
RunTargetOrDefault "Default"