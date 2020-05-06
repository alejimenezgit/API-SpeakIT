## ROUTES
|   Method   |  Endpoint    |     Description  | Views |
|------------|--------------|------------------|------------------|
|    GET     |    /         |               HomePage                        |       
|    GET     |    /login    |               Login page                      |
|    POST    |    /login    |               Send user info and logged in    |   
|    GET     |    /register |               Register page                   |
|    POST    |    /register |               Send user and get the cookie    |
|    GET     |    /artists  |               Artists page - search           |
|    GET    |     /artists/search?search="string"  |  Search an artist by name     |
|    GET     |    /artists/details/=:id  |   Artists page - search           |
|    GET     |    /venues |                 Venues page -                   | venues-browse.hbs
|    GET    |    /venues/:id |             Get the venue                    | venues-browse.hbs
|    GET    |    /venue/events/:id |        See all the events for one venue| venues-events.hbs
|    GET    |    /venue/tickets/:id |       See all the tickets             | venues-tickets.hbs
|    GET    |    /venue/ticket/pay/:id |    See all the tickets             | venues-ticket-pay.hbs
|    GET     |    /partner/add/venue    |   See the form to add the venue   | 
|    POST    |    /partner/add/venue    |   Send the information to the BD  |   
|    GET     |    /partner/add/event    |   See the form to add the venue   |
|    POST    |    /partner/add/venue    |   Send the information to the BD  |
