#!/bin/bash

ng test --watch=false
ng lint
ng e2e
