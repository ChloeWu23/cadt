# Use Ubuntu 20.04 LTS as the base image
FROM ubuntu:20.04

# Maintainer
LABEL maintainer="chloe.wu22@imperial.ac.uk"

# Update System
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y sudo

# Set the environment variable to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive



# Install necessary dependencies
RUN apt-get update -y && \
    apt-get install -y python3.8 python3-pip git lsb-release curl gnupg ca-certificates && \
    apt-get install -y expect

# Install Node Version Manager (NVM)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Define environment variable
ENV NVM_DIR /root/.nvm

## Clone Chia
WORKDIR /
RUN git clone https://github.com/Chia-Network/chia-blockchain.git

# Install Chia
WORKDIR /chia-blockchain
RUN git checkout latest && \
    sh install.sh


# Initialize Chia and generate keys
#RUN . ./activate 
    #chia keys generate


# Install CADT from Debian-based package repository
RUN curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/cadt/debian/ stable main" | sudo tee /etc/apt/sources.list.d/cadt.list > /dev/null && \
    apt-get update && \
    apt-get install cadt

# Copy the secure config into the image
COPY config.yaml /root/.chia/mainnet/cadt/v1/config.yaml
# Copy startup script and expect script from host to Docker container
COPY startup-script.sh /startup-script.sh
COPY expect_chia_keys_generate.exp /expect_chia_keys_generate.exp

# Set execute permissions
RUN chmod +x /startup-script.sh
RUN chmod +x /expect_chia_keys_generate.exp


# Expose CADT port
EXPOSE 31310

# Start CADT
CMD /startup-script.sh




