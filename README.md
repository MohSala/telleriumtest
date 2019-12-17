# API-project
==============================================

The Movement service gets called by raise order service and returns logistics details for location and trucks
----------


Get API running
----------------------------
```
npm install
npm start
```


Get Test running
----------------------------
```
npm run test
```

## Routes
!important - All routes must contain a Authentication header

Service NAME     			| END POINT                  | Description
--------------------------- | ---------------------------|---------------------
 base url                   | /                          | Base Endpoint
 user                       | /user                      | GET   Gets user data
 user                       | /user                      | POST Add new user
 hobby                      | /hobby                     | POST Add new hobby
 hobby                      | /hobby                     | GET Get all hobbies
 hobby                      | /hobby                     | DELETE delete hobby

                        

**Sample Request and Response for creating user:** POST
```
localhost:7500/user
Query parameters
#Request
    {
	"name": "Paul"
    }
#Response
{
    "error": false,
    "code": 201,
    "data": {
        "hobbies": [],
        "_id": "5df8da68d2f72b1ef7123f81",
        "name": "Paul",
        "createdAt": "2019-12-17T13:38:48.741Z",
        "updatedAt": "2019-12-17T13:38:48.741Z",
        "__v": 0
    },
    "message": "User created successfully"
}
```

**Sample Request and Response for getting users:** GET
```
localhost:7500/user
Query parameters
#Response
{
    "error": false,
    "code": 200,
    "data": [
        {
            "hobbies": [],
            "_id": "5df8cc6e4f9e53198515a592",
            "name": "Micheal",
            "createdAt": "2019-12-17T12:39:10.198Z",
            "updatedAt": "2019-12-17T12:39:10.198Z",
            "__v": 0
        },
    ],
    "message": "User data gotten successfully"
}
```

**Sample Request and Response for creating hobbies:** POST
```
localhost:7500/hobby
Query parameters
#Request
{
	"id": "5df8cc6e4f9e53198515a592",
	"name": "Coding",
	"passionLevel": "Very-High",
	"year": "2014"
}
#Response
{
    "error": false,
    "code": 201,
    "data": {
        "name": "Coding",
        "_id": "5df8d55b7bbe6a1d8275ba16",
        "passionLevel": "Very-High",
        "year": "2014",
        "id": "5df8cc6e4f9e53198515a592",
        "createdAt": "2019-12-17T13:17:15.507Z",
        "updatedAt": "2019-12-17T13:17:15.507Z",
        "__v": 0
    },
    "message": "Hobby created successfully"
}
```

**Sample Request and Response for getting hobbies:** GET
```
localhost:7500/hobby?id=5df8cc6e4f9e53198515a592
Query parameters
#Response
{
    "error": false,
    "code": 200,
    "data": [
        {
            "name": "Coding",
            "_id": "5df8d55b7bbe6a1d8275ba16",
            "passionLevel": "Very-High",
            "year": "2014",
            "id": "5df8cc6e4f9e53198515a592",
            "createdAt": "2019-12-17T13:17:15.507Z",
            "updatedAt": "2019-12-17T13:17:15.507Z",
            "__v": 0
        }
    ],
    "message": "Hobby created successfully"
}
```


**Sample Request and Response for getting hobbies:** DELETE
```
localhost:7500/hobby?id=5df8cc6e4f9e53198515a592
Query parameters
#Response
{
    "error": false,
    "code": 200,
    "message": "Hobby deleted successfully"
}
```

**Environment Variables:**
```
APP_PORT=7500
MONGODB_HOST=localhost
MONGODB_PORT=27017
BASE_URL=
MONGODB_DATABASE_NAME='app_test'
```