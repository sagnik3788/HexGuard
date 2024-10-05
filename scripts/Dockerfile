FROM dockurr/windows:latest 

# Set environment variables
ENV X64DBG_VERSION=latest
ENV WORKDIR=C:/analysis
ENV TOOLS_DIR=C:/tools

# Set the working directory
WORKDIR ${WORKDIR}

# Copy the extracted Python directory to the container
COPY Python-3.10.12/Python-3.10.12/ C:/Python/

# Create tools directory (in a more Docker-friendly way)
RUN mkdir -p ${TOOLS_DIR}

# Copy local x64dbg snapshot directory to the container
COPY snapshot_2024-10-03_12-14/ ${TOOLS_DIR}/x64dbg_snapshot/

# Copy the setup script
COPY setup_x64dbg.py C:/scripts/setup_x64dbg.py

# Set the entry point to run the setup script directly using the Python executable
# ENTRYPOINT ["C:\\Python\\python.exe", "C:\\scripts\\setup_x64dbg.py"]
ENTRYPOINT ["python3", "C:/scripts/setup_x64dbg.py"]



