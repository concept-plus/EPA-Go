#Script for running docker and uploading latest container to docker hub
##########################
#This script assumes that the container has been started and is running
#And has the name epa-eds. If not, the script will fail.
##########################
echo "---------------------"
echo "Building Docker Image"
echo "---------------------"
docker build -t conceptplus/epa-eds .

echo "----------------------------------"
echo "Pushing Docker Image to Docker Hub"
echo "----------------------------------"
docker push conceptplus/epa-eds

echo "-----------------------------------------"
echo "Stopping the Current Running Docker Image"
echo "-----------------------------------------"
docker stop epa-eds
docker rm epa-eds

echo "------------------------------------------"
echo "Running Docker Image - conceptplus/epa-eds"
echo "------------------------------------------"
docker run -p 80:80 --name epa-eds -d conceptplus/epa-eds