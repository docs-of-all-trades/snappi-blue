targetScope='subscription'

param location string
param environmentType string
param resourceGroupName string
param externalAPIsRGName string
param applicationCoreRGName string
param appServiceEnvironmentName string
param acrName string
@secure()
param acrPassword string

//AppServicePlan parameters
var externalApisAppServicePlanName = 'lasp-externalAPI-${environmentType}-${location}-01'
//AppService parameters
var appServices = [
  {
    name: 'aps-snapiDocs-${environmentType}-${location}-${uniqueString(subscription().id)}'
    kind: 'app,linux,container'
    identityType: 'SystemAssigned' //SystemAssigned, UserAssigned, [SystemAssigned, UserAssigned], None
    reserved: true //reserved = linux
    enabled: true
    httpLoggingEnabled: true
    ciEnabled: 'true'
    linuxFxVersion: 'DOCKER|${acrName}.azurecr.io/snappi.docs:latest'
  }
]

resource ApplicationAPIs_Linux_RG 'Microsoft.Resources/resourceGroups@2022-09-01' existing = {
  name: resourceGroupName
}


module appService '../Base/appService.bicep' = {
  name: 'appService'
  scope: ApplicationAPIs_Linux_RG
  params:{
    location: location
    environmentType: environmentType
    appServicePlanName: externalApisAppServicePlanName
    appServices: appServices
    externalAPIsRGName: externalAPIsRGName
    hostingEnvironmentRGName: applicationCoreRGName
    hostingEnvironmentName: appServiceEnvironmentName
    acrPassword: acrPassword
    acrName: acrName
  }
}

