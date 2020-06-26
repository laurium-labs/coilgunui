using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes
using CoilGun: dictionary_api

function dotNotationToDict(params::Dict)
    result = Dict()
    for (key, value) in params
        # key: sauna.stove.mass
        split_keys = split(key, ".")
        current_dict = result
        for key_idx in 1:length(split_keys)
            sub_key = split_keys[key_idx]
            if key_idx == length(split_keys)
                current_dict[sub_key] = parse(Float64, value)
            elseif !haskey(current_dict, sub_key) 
                current_dict[sub_key] = Dict()
                current_dict = current_dict[sub_key]
            else 
                current_dict = current_dict[sub_key]
            end
            
        end
    end
    return result
end

function simulate(req::HTTP.Request)
    params = HTTP.queryparams(HTTP.URI(req.target))

    for (key, value) in params
        println(key, "=>", value)
    end
    println("1")
    b = JSON.json(dictionary_api())
    println("2")
    req.response.body = bytes(b)
    println("3")
    return req.response
end
endpoints = [
    (simulate, "GET", "/simulate"),
]

r = Joseki.router(endpoints)
haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8009
println("server launch")
HTTP.serve(r, "0.0.0.0", port; verbose=false)
println("server ended")
