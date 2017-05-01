let
  pkgs   = import <nixpkgs> {};
  stdenv = pkgs.stdenv;

in stdenv.mkDerivation {
  name = "advjs";
  version = "0.0";
  src = ./.;

  buildInputs = with pkgs; [
    chromium # Best debugger around
    nodejs   # For the web server
    yarn     # Installing dependencies
  ];

  shellHook = ''
  '';
}
