# convivial-profiler

[![Continous Integration](https://github.com/morpht/convivial-profiler/actions/workflows/main.yml/badge.svg)](https://github.com/morpht/convivial-profiler/actions?query=branch%3Amain)

Provides ability for personalization and visitor data collection. [Read more about it.](https://www.morpht.com/drupal-personalization)

## Installation

* `git clone git@github.com:morpht/convivial-profiler.git`
* cd convivial-profiler
* npm install
* npm start
* visit `http://localhost:8080/`

## Sources

### Functions Using All Parameters

#### `cookie(profiler, source, values)`
Fetches a value from cookies based on the source name and adds it to the values array if found.

#### `get(profiler, source, values)`
Performs an asynchronous HTTP GET request to fetch data from a specified resource URL and adds the response to the values array.

#### `httpuseragent(profiler, source, values)`
Determines the device type (mobile or desktop) from the user agent string and adds it to the values array.

#### `meta(profiler, source, values)`
Collects content from `<meta>` tags matching a specified attribute name and adds each content piece to the values array.

#### `query(profiler, source, values)`
Extracts values from URL query parameters matching the specified source parameter and adds them to the values array.

#### `time(profiler, source, values)`
Adds the current time component (hour, minute, or second) specified in the source to the values array.

### Functions Not Using All Parameters

#### `acceptlang(profiler, source, values)` *(Does not use `source`)*
Adds the browser's language setting to the values array, or defaults to "en-AU" if the browser language is not set or does not include a region.

## Processors

### Functions Using All Parameters

### `accumulation(profiler, processor, values)`
Increments a value within an accumulator based on the input values.

### `dimension(profiler, processor, values)`
Adjusts dimension values, optionally normalizing them across the input values.

### `extreme_geoip(profiler, processor, values)`
Stores geographic information with an expiration time based on input values.

### `language_full(profiler, processor, values)`
Stores the full language information from input values with an expiration time.

### `language_simple(profiler, processor, values)`
Stores a simplified language code from input values with an expiration time.

### `map(profiler, processor, values)`
Maps input values to stored values based on predefined mappings, with fallback and default values.

### `pageview(profiler, processor, values)`
Logs page views and/or increments a counter based on the processor's configuration.

### `searchquery(profiler, processor, values)`
Tracks search queries based on URL parameters, logging and incrementing counters for unique searches.

### `store(profiler, processor, values)`
Stores values with an expiration time, with support for permanent storage by setting a specific TTL.

### `unstore_value(profiler, processor, values)`
Removes a stored value based on matching input values and temporarily stores a specified value.

### `temp(profiler, processor, values)`
Stores values temporarily in the profiler's temporary storage.

## Destinations

### Functions not using the `values` parameter directly.

#### `bestpick(profiler, destination, values)`
Selects the best value based on a set of criteria from local storage and optionally stores it in local storage or cookies.

#### `copy(profiler, destination, values)`
Copies a value identified by a storage key to either local storage or cookies, with an option to stringify the value.

#### `flag(profiler, destination, values)`
Stores a flag value in local storage or cookies, prefixed or suffixed as defined.

#### `formfiller(profiler, destination, values)`
Auto-fills form fields with data from local storage or cookies based on configurations.

#### `formtracker(profiler, destination, values)`
Attaches an event listener to a form to track submissions and push data to the dataLayer.

#### `officehours(profiler, destination, values)`
Determines if the current time falls within configured office hours and stores the result in local storage or cookies.

#### `range(profiler, destination, values)`
Categorizes a numeric value into predefined ranges and stores the result in local storage or cookies.

#### `season(profiler, destination, values)`
Determines the current season based on a predefined value and stores it in local storage or cookies.

#### `set(profiler, destination, values)`
Sets a specified value in local storage or cookies to '1'.

#### `threshold(profiler, destination, values)`
Stores data in local storage or cookies if it exceeds a certain threshold.

#### `top(profiler, destination, values)`
Identifies and stores the top value from a dimension in local storage or cookies.

#### `unset(profiler, destination, values)`
Unsets a specified value in local storage or cookies by setting it to '0'.

### Functions Using All Parameters

#### `datalayer_event(profiler, destination, values)`
Pushes events to the dataLayer for analytics purposes, using the `values` parameter to create multiple events if necessary.

#### `remove(profiler, destination, values)`
Removes data from local storage or cookies based on a set of criteria.

## Copyright and licence

Copyright, Morpht Pty Ltd, 2020 - 2022

The library is available for community use and can be licensed for commercial projects. Licensing and pricing information is available at [Convivial Profiler pricing page](https://www.morpht.com/convivial-profiler-pricing) on the [Morpht website.](https://www.morpht.com)
