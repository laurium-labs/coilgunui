using Plots
using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes
using CoilGun: dictionary_api
#=
need to create scenarios in coilGunSim, will have to import that sim
here, have sim take inputs from here, then execute, data retuern...? not sure
=#
#first 2 functions are just default returns for front end, will be deleted by end
function velocityPlot()
     y = rand(10); # These are the plotting data
    return string(y)
    #return plot(x,y)
end

function plot2()
    x=rand(40)
    return string(x)
end
#=
run sim, get x and y chart data, return it as such, apply to each graph
=#

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
     # println(dotNotationToDict(params))
     #b = dictionary_api(params) #execution will stop here, not an access problem
    # println(dictionary_api())
    #println("HHHERREEREERE")
    #println(req)
    # req.response.body = bytes(b)
    #println(dictionary_api())
    println("1")
    b = JSON.json(dictionary_api())
    println("2")
    req.response.body = bytes(b)
    println("3")
    return req.response

    # println("jdjd")
    # return dictionary_api()

     #dict_format = parseParams(params)
      #b = JSON.json(dict_format)
#      preString =string(dotNotationToDict(params))
#    return string(dotNotationToDict(params))#("[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]")
end
endpoints = [
    (simulate, "GET", "/simulate"),
]

r = Joseki.router(endpoints)

 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8003
println("server launch")
HTTP.serve(r, "0.0.0.0", port; verbose=false)
println("server ended")
