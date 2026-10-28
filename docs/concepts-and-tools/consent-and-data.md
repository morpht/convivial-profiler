# Consent and data handling

Decide which signals your site needs before enabling collection. The library provides collection and publication mechanisms; your integration decides when they may run and how long their outputs should remain available.

## The cookie argument is limited

The constructor's `cookieconsent` argument defaults to `true`. When the library generates a client ID, it first reads `ConvivialProfilerCookieConsent`; an existing cookie takes precedence over the argument. It writes that consent cookie for 365 days and writes a newly generated `ConvivialProfilerClientId` cookie for 365 days only when consent is truthy.

Passing `false` does **not** disable local storage, processors, HTTP sources, analytics destinations, or destination cookies. It also does not delete an existing client-ID cookie. Supplying a truthy `clientId` bypasses the client-ID helper, but still does not gate collection.

If collection must wait for permission, wait before constructing the profiler and calling `collect()`. If that permission is withdrawn, stop future collection and clear the relevant internal and published data through your site's consent integration. The library has no general withdrawal or reset API.

## Where data goes

| Mechanism | Data handling |
| --- | --- |
| Internal storage | Browser local storage under `convivial_profiler` |
| Local-storage destinations | Additional keys readable by scripts on the same origin |
| Cookie destinations | Browser cookies that may be sent with matching requests |
| `get` source | A request to the configured remote or same-origin endpoint |
| Analytics destinations | Events on `window.dataLayer`, which another script may transmit |
| Form filling | Published values copied into inputs and potentially submitted with the form |

Profile data is not encrypted by this library. Browser scripts can inspect it. Use non-sensitive category identifiers in examples and production configuration, and avoid collecting full URLs or form values that contain sensitive information.

## Cookie behaviour

The cookie helper sets `path=/` and URI-encodes values. It does not explicitly set `Secure`, `SameSite`, or a domain, and JavaScript cannot create `HttpOnly` cookies.

Most destination plugins call the helper without a lifetime. That produces an invalid expiry date rather than a configured persistent lifetime; do not rely on those cookies having a specific retention period. Validate their behaviour in supported browsers or implement the required cookie policy in the integration.

## Clearing data

Remove only the keys owned by your integration. Deleting `convivial_profiler` clears internal state for every site ID on that origin, but leaves published keys and cookies intact. A long-lived instance may still hold state in memory and write it back, so stop using it before clearing storage.

Keep an inventory of published target keys and dynamically generated flag keys. Avoid `localStorage.clear()` on a shared origin because it also removes other applications' data.

These are implementation details to inform your site's policy; the constructor argument alone does not implement that policy.
