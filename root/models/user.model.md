# user Table Schema
## users
## columns
id(uuid,primary key)
name(text,not null)
email (unique,text,not null)
password (store raw password — no hashing required for evaluation)
role (customer | owner | driver)


## Relationships
one user(Owner)->Many vehicles
one user(Driver)->Assigned to one vehicle
one user(Customer)->many trips
