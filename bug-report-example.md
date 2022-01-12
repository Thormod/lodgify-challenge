
# Issue description

Given a user selecting a vacation rental 
When the user goes to the pricing page
Then the page should be displayed

# Steps to reproduce the issue

1.  Visit `/pricing.html`
2. Open the inspect log
3. You'll see an Uncaught ReferenceError

# What's the expected result?
- Should not have errors

# What's the actual result?
- Uncaught ReferenceError: Cookies is not defined
```javascript
engine.js.descargar:739 Uncaught ReferenceError: Cookies is not defined
    at engine.js.descargar:739
    at engine.js.descargar:872
```
