# Endpoints

## Quote Endpoints

### GET `/api/quotes`

Retrieves quotes with support for pagination, filtering by Discord ID, and searching within the quote text.

#### Query Parameters

- `page`: Optional. Specifies the page number for pagination.
- `discordId`: Optional. Filters quotes by Discord ID.
- `search`: Optional. Searches for text within quotes.

#### Response Status Codes

- **200 OK** - Successfully retrieved quotes.

#### Response Body

```json
{
  "total_count": 100, // Total count of quotes matching the criteria
  "page": 1, // Current page number
  "quotes": [ // Array of quotes
    {
      "id": 1,
      "text": "Quote text",
      "discordId": "Discord ID",
      "createdAt": "Timestamp",
      "updatedAt": "Timestamp"
    },
    // More quotes...
  ]
}
```

### POST `/api/quotes`

Creates a new quote.

#### Request Body

```json
{
  "text": "Your quote text",
  "discordId": "Your Discord ID"
}
```

#### Response Status Codes

- **201 Created** - Successfully created the quote.
- **400 Bad Request** - Missing quote text.
- **400 Bad Request** - Missing discord id.

#### Response Body

```json
{
  "id": 1,
  "text": "Your quote text",
  "discordId": "Your Discord ID",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

### GET `/api/quotes/top`

Gets the top 20 quotes with more than 3 votes.

#### Response Status Codes

- **200 OK** - Successfully retrieved quotes.

#### Response Body

```json
[
  {
    "id": 1,
    "text": "Quote text",
    "discordId": "Discord ID",
    "createdAt": "Timestamp",
    "updatedAt": "Timestamp",
    "votes": [
      {
        "id": 1,
        "createdAt": "Timestamp",
        "updatedAt": "Timestamp",
        "discordId": "Voter's Discord ID",
        "quoteId": 1 // ID of the associated quote
      },
      // More votes...
    ]
  },
  // More quotes...
]
```

### DELETE `/api/quotes/[slug]`

Deletes a quote by its ID.

#### Path Parameter

- `slug`: ID of the quote to be deleted.

#### Response Status Codes

- **200 OK** - Successfully deleted quote.

#### Response Body

```json
{
  "id": 1,
  "text": "Quote text",
  "discordId": "Discord ID",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```

### POST `/api/quotes/[slug]/vote`

Creates a vote for a specific quote.

#### Path Parameter

- `slug`: ID of the quote.

#### Request Body

```json
{
  "discordId": "Voter's Discord ID"
}
```

#### Response Status Codes
        
- **200 OK** - Successfully created the quote vote.
- **400 Bad Request** - Missing quote text.
- **400 Bad Request** - Missing discord id.
- **403 Forbidden** - You have reached the maximum amount of votes.
- **403 Forbidden** - You have already voted for this quote.

### DELETE `/api/quote/[slug]/vote`

Deletes a vote for a specific quote.

#### Path Parameter

- `slug`: ID of the quote.

#### Request Body

```json
{
  "discordId": "Voter's Discord ID"
}
```

#### Response Status Codes

- **200 OK** - Successfully deleted quote.

#### Response Body

```json
{
  "count": 1 // Number of deleted votes
}
```