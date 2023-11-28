# Endpoints

## Quote Endpoints

### GET `/api/quotes`

Returns a list of quotes.

#### Parameters

- `page` (optional): Page number for pagination. If not provided, defaults to the top 20 quotes with more than 3 votes.

#### Response

- **200 OK** - Successfully retrieved quotes.
- **500 Internal Server Error** - Failed to fetch quotes.

#### Example Usage

```javascript
fetch('/api/quotes?page=1')
  .then(response => response.json())
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```

### DELETE `/api/quotes`

Deletes a quote based on its ID and Discord ID.

#### Request Body

```json
{
  "id": "quote_id",
  "discordId": "discord_user_id"
}
```

#### Response

- **200 OK** - Successfully deleted the quote.
- **500 Internal Server Error** - Failed to delete the quote.

#### Example Usage

```javascript
fetch('/api/quotes', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "id": "quote_id",
    "discordId": "discord_user_id"
  })
})
  .then(response => response.json())
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```

### POST `/api/quotes`

Creates a new quote.

#### Request Body

```json
{
  "text": "Your quote text here",
  "discordId": "discord_user_id"
}
```

#### Response

- **201 Created** - Successfully created the quote.
- **500 Internal Server Error** - Failed to create the quote.

#### Example Usage

```javascript
fetch('/api/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "text": "Your quote text here",
    "discordId": "discord_user_id"
  })
})
  .then(response => response.json())
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```

## Quote Vote Endpoints

### POST `/api/quotes/vote`

Creates a new quote vote.

#### Request Body

```json
{
  "quoteId": "quote_id",
  "discordId": "discord_user_id"
}
```

#### Response

- **201 Created** - Successfully created the quote vote.
- **500 Internal Server Error** - Failed to create the quote vote.

#### Example Usage

```javascript
fetch('/api/quotes/vote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "quoteId": "quote_id",
    "discordId": "discord_user_id"
  })
})
  .then(response => response.json())
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```

### DELETE `/api/quotes/vote`

Deletes a quote vote based on its ID and Discord ID.

#### Request Body

```json
{
  "quoteId": "quote_id",
  "discordId": "discord_user_id"
}
```

#### Response

- **200 OK** - Successfully deleted the quote vote.
- **500 Internal Server Error** - Failed to delete the quote vote.

#### Example Usage

```javascript
fetch('/api/quotes/vote', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "quoteId": "quote_id",
    "discordId": "discord_user_id"
  })
})
  .then(response => response.json())
  .then(data => {
    // Handle data
  })
  .catch(error => {
    // Handle error
  });
```
