using Pkg
Pkg.add(PackageSpec(url="https://github.com/laurium-labs/CoilGun.jl"))
Pkg.add("HTTP")
Pkg.add("Joseki")
Pkg.add("JSON")
Pkg.add("PackageCompiler")

using PackageCompiler

create_sysimage([:CoilGun, :HTTP, :Joseki, :JSON]; precompile_statements_file="precompile_coilgunner", sysimage_path="sys_coilgunner.so")