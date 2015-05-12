## Deploying Rails Apps
### Set Up Instance for Deployment - (On the server)
#### Step 1, install rvm and ruby (and the cert keys)
- 1 `gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3`
- 2 `\curl -sSL https://get.rvm.io | bash -s stable`
- 3 `rvm install ruby-2.1.5`
- 4 `rvm --default use ruby-2.1.5`

#### Step 2, install nginx, nodejs and thin
- 1 `sudo aptitude install nginx`
- 2 `gem install thin`
- 3 `rvmsudo thin install`
- 4 `sudo apt-get install nodejs`

#### Step 3, generate public keys and add to the server
- 1 `ssh-keygen -t rsa `
- 2 Add `~/.ssh/id_rsa.pub` to github repository

#### Step 4, create the directory on the server
- 1 `sudo mkdir -p /webapps`
- 2 `sudo mkdir -p /webapps/analysis_api`
- 3 `sudo chown ubuntu /webapps/analysis_api`

### Deploy Rails Application Using Capistrano - (From the git repo)
- 1 Modify the `config/deployment/production.yml` file and change the IP adress of the server to deploy to the chosen IP.
- 2 Deploy the server with `cap production deploy` from the directory.

### Run the server
- 1 `ssh ubuntu@instance_ip`
- 2 `cd /webapps/analysis_api/current`
- 2 `thin start -p 4500`

The server is now available on IPADRESS:4500


<!-- ### Setup nginx and three server instances
- 1 `rvmsudo thin config -C /etc/thin/analysis_api.yml -c /webapps/analysis_api/current/ --servers 3 -e production`
- 2  -->