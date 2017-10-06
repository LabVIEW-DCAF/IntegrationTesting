# DCAF Integration Testing Repository

This repository contains test code for the DCAF project. Its tests fall into multiple categories:

1. Build Tests. E.g. Building an executable of a DCAF project Main.vi
2. Performance Tests. E.g. Run a DCAF application and measure useful performance measures such as execution time, memory and CPU usage.
3. Configuration file compatibility. E.g. Make sure that the configuration file be successfully loaded.

The Jenkinsfile in the repository root instructs a build machine to run the various tests.

There are also reports to help visualize the performance metrics over time.
