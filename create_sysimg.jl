using Pkg
Pkg.add(PackageSpec(url="https://github.com/laurium-labs/CoilGun.jl"))
Pkg.add("PackageCompiler")
Pkg.add("JSON")
Pkg.add("HTTP")
Pkg.add("Joseki")

using PackageCompiler

create_sysimage([:CoilGun, :JSON, :HTTP, :Joseki]; precompile_execution_file="./precompile_coilgun.jl", sysimage_path="sys_coilgunner.so")