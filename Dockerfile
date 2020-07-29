FROM julia

COPY precompile_coilgunner .

COPY create_sysimg.jl .

COPY precompile_coilgun.jl .

COPY be .

RUN apt-get update && apt-get install -y gcc g++ && rm -rf /var/lib/apt/lists/*

RUN julia create_sysimg.jl

CMD julia --project="./be" --sysimage sys_coilgunner.so -e 'include("./src/server.jl")'