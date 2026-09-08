---
title: MA crossover backtester
tagline: A moving average crossover backtesting engine, written from scratch in Python.
stack: [Python, numpy, pandas, matplotlib, Alpaca Markets API]
role: Sole developer
dates: Mar 2026 – Present
status: In progress
links:
  repo: https://github.com/pranavg237/ma-crossover-backtest
featured: true
order: 3
---

## What it is

A backtesting engine for moving average crossover strategies. It takes a parameterized short and long SMA window, simulates the full equity curve over historical data, models transaction costs, and reports how the strategy actually did.

## Why I built it

I could have run this on an existing backtesting library in an afternoon. The point was not to get a number out — it was to understand where the numbers come from, because a backtest is mostly a machine for lying to yourself and you cannot see the lies from behind a library API.

So the engine computes its metrics from scratch: Sharpe ratio, maximum drawdown, win rate. Writing the drawdown calculation yourself is the fastest way to learn what it is actually measuring, and writing the fill logic yourself is the fastest way to notice how much of a strategy's returns can be an artifact of assuming you traded at a price nobody would have given you.

## What I built

**Signal generation and position sizing.** A short-window SMA crossing a long-window SMA generates the entry and exit signals; position sizing turns a signal into a trade.

**Full equity curve simulation** with transaction cost modeling, so returns are net of what it costs to trade rather than gross of it.

**Metrics from scratch** — Sharpe ratio, maximum drawdown and win rate, implemented directly rather than pulled from a library.

**Data and execution** through the Alpaca Markets API: historical OHLCV pulls for the backtest, and a $100K **paper** portfolio for running the strategy forward. That is paper trading — simulated fills against live market data, not live capital.

### Walk-forward optimization

The hard part of this project is not writing the strategy, it is not fooling yourself with it.

The naive approach is to sweep every short/long window combination across the whole history and report the best one. That number is meaningless: the parameters were chosen with knowledge of the data they are being tested on, so the "result" is look-ahead bias with a Sharpe ratio attached.

The engine uses walk-forward optimization instead. Parameters are fit on an in-sample window, then evaluated on the out-of-sample window that follows, and the window rolls forward. Every reported result comes from data the parameters had never seen. The numbers are worse. They are also real.

## What's next

Extending the engine to a Fama-French factor model, and working through Joshi's quantitative finance interview guide alongside it.

## Links

The repository is at [github.com/pranavg237/ma-crossover-backtest](https://github.com/pranavg237/ma-crossover-backtest).
