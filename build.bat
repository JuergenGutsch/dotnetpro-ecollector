@echo off
cls

.paket\paket.bootstrapper.exe

.paket\paket.exe install
if errorlevel 1 (
  exit /b %errorlevel%
)

"packages\FAKE\tools\Fake.exe" build.fsx
pause