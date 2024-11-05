targetScope = 'subscription'
param location string = 'westeurope'
param environmentType string = 'Dev'
@secure()
param acrPassword string
param acrName string

var applicationAPIsLinuxRGName = 'ApplicationAPIs_Linux_RG-${environmentType}-${location}'
var externalAPIsRGName = 'ExternalAPIs_RG-${environmentType}-${location}'
var applicationCoreRGName = 'ApplicationCore_RG-${environmentType}-${location}'
var appServiceEnvironmentName = (environmentType == 'Uat') ? 'ase-${environmentType}-${location}-${uniqueString(subscription().id)}' : 'ase-${environmentType}-${location}${uniqueString(subscription().id)}'

module applicationAPIsLinuxRG './ResourceGroups/applicationAPIsLinuxResourceGroup.bicep' = {
    name: 'applicationAPIsLinuxRG'
    params: {
        resourceGroupName: applicationAPIsLinuxRGName
        location: location
        environmentType: environmentType
        externalAPIsRGName: externalAPIsRGName
        applicationCoreRGName: applicationCoreRGName
        appServiceEnvironmentName: appServiceEnvironmentName
        acrName: acrName
        acrPassword: acrPassword
    }
}
