#Cluster and Cloud Computing - Assignment 2
##Global Twittering - Analysis API

###Members:
- Ed Crupi - 538156 - crupie@unimelb.edu.au
- Mat Blair - 541625 - blairm@unimelb.edu.au
- Siddarth Bose - 707042 - sbose@student.unimelb.edu.au
- Jordan Steele - - jsteele@student.unimelb.edu.au
- Jun Min - 542339 - jmcheong@student.unimelb.edu.au
- Renlord - 541368 - rnyang@student.unimelb.edu.au

###IP Address List (username is `ubuntu`)

- 144.6.226.193 (Streaming/Scraping)
- 144.6.227.63 (Analysis API)
- 144.6.227.64 (Streaming/Scraping)
- 144.6.227.66 (Graph API, Neo4j and Couchdb)

###Used Commands (for Ansible playbook)
sudo apt-get update
sudo apt-get install couchdb
sudo apt-get install curl
sudo apt-get install python-swiftclient

###Related Applications
These related applications are required for deployment of this system as a whole. They are kept in separate repos for ease of development and deployment.

- [Analysis API](https://github.com/matblair/COMP90024-Analysis-Api)
- [Graph API](https://github.com/matblair/COMP90024-Graph-API)