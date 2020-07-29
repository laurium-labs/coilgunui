using Pkg
Pkg.add(PackageSpec(url="https://github.com/laurium-labs/CoilGun.jl"))

using PackageCompiler

create_sysimage([:CoilGun]; precompile_execution_file="precompile_coilgun.jl", sysimage_path="sys_coilgunner.so")