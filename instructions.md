# Datum Gateway

## Documentation

- [CONVOY Datum documentation](https://convoy.xyz/getstarted) — upstream guide to DATUM, pool mining on CONVOY, and miner setup.

## What you get on StartOS

- A **Web UI** interface (the Datum Gateway dashboard) for monitoring connected miners, hashrate, and share activity.
- A **Stratum Server** interface that your ASICs point at to receive work.
- A pre-wired connection to a local **Bitcoin** node (cookie-authenticated, with `blocknotify` set automatically) for block template generation.
- A default configuration that pool-mines on CONVOY; switchable to another DATUM-supporting pool or solo mining through one action.

## Getting set up

You need a Bitcoin node running on this server before Datum Gateway can produce work.

Datum Gateway posts two critical tasks after install. You can't start the service until both are done.

1. Install and start **Bitcoin**. Datum Gateway will set its `blocknotify` automatically when the dependency is satisfied.
2. Run the **Create Password** task. A random admin password is generated and shown once — copy and save it before dismissing. You'll need it to log into the dashboard. If you lose it, run the **Reset Password** action later.
3. Run the **Config pool address** task and enter the Bitcoin address you want mining rewards paid to. This is the payout address Datum Gateway uses for solo-found blocks, and as the fail-safe when pooling on CONVOY.
4. Start Datum Gateway.

## Using Datum Gateway

### Pointing your miners at it

Configure each ASIC with:

- **Stratum URL** — the Stratum Server interface address (host:port of this service; default port is `23334`).
- **Username** — a Bitcoin address, optionally suffixed with a worker name (e.g. `bc1q…abc.bitaxe1`). With **Pool Pass Full Users** enabled (the default), this is the address CONVOY pays out to.
- **Password** — ignored. Leave blank or set `x`.

If you'd rather use a single payout address for every miner and put only worker names in your ASICs, run the **Datum** action and disable **Pool Pass Full Users**. The Bitcoin address from the **Mining Settings** action is then used for pool payouts.

### Dashboard

Open the **Web UI** interface and log in with the admin password from setup. The dashboard shows connected stratum clients, estimated hashrate, and current pool state. Datum Gateway's health checks surface the same client-count and hashrate numbers on the service page.

### Actions

- **Create Password / Reset Password** — generate a new admin dashboard password (named "Create Password" when none is set, "Reset Password" afterward). The new password is shown once.
- **Datum** — pool host, port, public key, worker pass-through, and the **Collaborative reward sharing** selector that controls pool vs solo behavior:
  - **require** (default) — pool mining only; if the pool is unreachable, Datum Gateway stops issuing work and your miners fail over to whatever backup pool they're configured with.
  - **prefer** — pool mine when possible, fall back to solo mining if the pool is unavailable.
  - **never** — solo mining only; rewards from any block you find go to the **Bitcoin Address** in the Mining Settings action.
- **Mining Settings** — payout Bitcoin address, primary/secondary coinbase tags, coinbase unique ID.
- **Stratum Server Settings** — thread and client limits, vardiff tuning, stale-share window, miner fingerprinting, and **Username modifiers** for splitting shares across multiple Bitcoin addresses by percentage (per modifier, splits must sum to 100).
- **Bitcoin RPC settings** — how often Bitcoin sends updated templates.
- **API** — toggle **Allow Insecure Authentication** if your browser (Safari) refuses to authenticate against the dashboard otherwise.
- **Logger** — console and file log levels, optional log file path.
