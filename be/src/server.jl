using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes
using CoilGun: dictionary_api, get_default_scenario_json

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
    c = dotNotationToDict(params)
    b = JSON.json(dictionary_api(c))
    req.response.body = bytes(b)
    return req.response
end

function params(req::HTTP.Request)
    b= get_default_scenario_json()
    req.response.body = bytes(b)
    return req.response
end

endpoints = [
    (simulate, "GET", "/simulate"),
    (params, "GET", "/params")
]

r = Joseki.router(endpoints)
println("before")
haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8009
println("launched")
HTTP.serve(r, "0.0.0.0", port; verbose=false)
