#!/bin/bash

ng test --watch=false
ng lint
ng build -prod
