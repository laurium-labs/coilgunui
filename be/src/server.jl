using Plots
using JSON
using HTTP
using Joseki
import HTTP.IOExtras.bytes

function velocityPlot()
     y = rand(10); # These are the plotting data
    return string(y)
    #return plot(x,y)
end

function parseParams(params::Dict)
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
#returns list... "wheight" =>50...

function plot2()
    x=rand(20)
    return string(x)
end
#=
run sim, get x and y chart data, return it as such, apply to each graph
=#
function simulate(req::HTTP.Request)
    params = HTTP.queryparams(HTTP.URI(req.target))
    println(params)
     dict_format = parseParams(params)
     b = JSON.json(dict_format)
    println(string(b))
   return string(b)#("[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]")
end
endpoints = [
    (simulate, "GET", "/simulate"),
]

r = Joseki.router(endpoints)

 haskey(ENV, "PORT") ? port = parse(Int32, ENV["PORT"]) : port = 8000
println("trees")
HTTP.serve(r, "0.0.0.0", port; verbose=false)
println("here")
