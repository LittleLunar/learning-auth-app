# Learning Access Token, Refresh Token with JWT #

> ## Access Token
- Has a short period expiration time
- Can use for authentication

> ## Refresh Token
- Has a long period expiration time
- Use for create a new access token when it expired
- If the refresh token expire then users need to do the login mechanism again

> ## Json Web Token
- Simply called Super Duper encrypt-decryption algorithm
- Splited to 3 section Header, Payload, Signature