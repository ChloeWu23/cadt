#!/bin/bash
set -e


# Activate environment
source /chia-blockchain/activate

# Initialize Chia
chia init
chia init --fix-ssl-permissions 

# Get the mnemonic key from the environment variable
#MNEMONIC=$MNEMONIC

# Add keys to chia
#echo $MNEMONIC | chia keys add
#echo "generate keys"
#chia keys show
#chia keys add -f $KEYS_FILE -l $KEYS_LABEL

#spawn chia keys generate
#expect "Enter the filename of your public and secret keys"
#send "\n"
#interact


# Run expect script to automate chia keys generate
expect /expect_chia_keys_generate.exp


#setting testnet to be true
echo "setting testnet"
chia configure --testnet true

echo "Starting Chia services"
chia start node wallet data


# Allow some time for the services to start up
echo "Sleeping for 60 seconds"
sleep 60

# Run Chia services
echo "Running CADT"
/opt/cadt/cadt