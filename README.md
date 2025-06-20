


####Part A

##Left Screen View 

- Number of Vehicle 
- Poing of Interests (POI's)
- Scene 


## Right Screen View
- Selected Vehicle Details
    -- Size of the vehicle 
    -- Load carrying capacity
    -- Fuel indicator 
    -- Function of the Vehcile 
    -- Vehicle ID 
    -- Vehicle Status 
    --location. lat,log


#### Part B

##NLP/command planner  tals

## AI based Task Planner
    -- Operator specify the task and as planner to prepare a Plan
    -- Approve -> sent a plan or Decline the plan 
    -- Planner should have access to Selected vehicle's information





###Functional Requirements
-View/GET the vehicle status/information  (e.g. Truck A, B, C, D)
-View POI's , location ( e.g. Zone A, B, C)
-Convert Instruction to list of individual Tasks
    -list set of task
        -MOVE (source -> destination)
        -LOAD (source zone ( Material))
        -UNLOAD (destination)
        -Repeat

-Task planner to get selected vehicle's information       


###Non Functional Requirements
- High traffic or too many usuers using
- Realtime status update of vehicle and zone information





###API Request  ####### 

//Task endpoints
axios.post('/taskPlannerAgent', taskPlanningAgent)
axios.post('/task/post', publishTask)

//select entity endpoints
axios.post('/task/setSelectedVehicle', setSelectedVehicle)






##Assumption
-- Assuming the operator won't be able define a task properly so a Re Act agent will be useful in this case it provide reasoning before each step, use  tools to fetch information and continously self prompt, to improve the response in proper steps 


###Database
Vehicle
    -- ID: String = 'randomString'
    -- Capacity: number - 100 tons
    -- Fuel_Status: number = 1-100
    -- Type: String =  Loader, Crusher
    -- Status: string =  Moving, Loading, Idle, Stalled (  status usuful only for realtime information storage)
    -- Location: string[] = Latitude,longitude

POI'S
    -- ID: string = 'randomString'
    -- Material: string = zinc (Material A), iron (Material B), ore (Material C), waste (Material D)
    -- Location: string[] = Latitude, Longitude


##Tech Stack
    -- React
    -- Prisma ORM
    -- Axios (API request)
    -- leaflet- Map View


### How to run 
    - Creat .env variable file 
        -COREAPP_API_URL=http://localhost:3000/api/v1

    - RUN "npm i"
    - RUN "npm run dev"

