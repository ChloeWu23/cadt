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
#expect /expect_chia_keys_generate.exp

# Generate Chia keys
echo "generate chia keys"
echo "" | chia keys generate

#setting testnet to be true
echo "setting testnet"
chia configure --testnet true

echo "Starting Chia services"
chia start node wallet data


#get wallet address
echo "Chia wallet address"
chia wallet get_address

# Allow some time for the services to start up
echo "Sleeping for 300 seconds(5 minutes)"
sleep 300

#check wallet and blockchian sysnced or not
echo "Show blockchain syncing status"
chia show -s

echo "Show wallet syncing status"
chia wallet show

# Run Chia services
echo "Running CADT"
/opt/cadt/cadt