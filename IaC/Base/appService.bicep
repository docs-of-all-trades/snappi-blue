param location string
param deploymentTimestamp string = utcNow('u')
param environmentType string
param appServicePlanName string
param appServices array
param externalAPIsRGName string
param hostingEnvironmentRGName string
param hostingEnvironmentName string
@secure()
param acrPassword string
param acrName string

resource linuxAppService 'Microsoft.Web/sites@2022-03-01' = [for appService in appServices: if (contains(appService.kind, 'linux')) {
    name: appService.Name
    location: location
    tags: {
        Environment: environmentType
        LastDeployed: deploymentTimestamp
    }
    kind: appService.kind
    identity: {
        type: appService.identityType
    }
    properties: {
        enabled: appService.enabled
        serverFarmId: resourceId(externalAPIsRGName, 'Microsoft.Web/serverfarms', appServicePlanName)
        hostingEnvironmentProfile: {
            id: resourceId(hostingEnvironmentRGName, 'Microsoft.Web/hostingEnvironments', hostingEnvironmentName)
        }
        reserved: appService.reserved
        isXenon: false
        hyperV: false
        siteConfig: {
            numberOfWorkers: 1
            linuxFxVersion: appService.linuxFxVersion
            acrUseManagedIdentityCreds: false
            alwaysOn: true
            httpLoggingEnabled: appService.httpLoggingEnabled
            http20Enabled: false
            functionAppScaleLimit: 0
            minimumElasticInstanceCount: 0
            appSettings: [
                {
                    name: 'DOCKER_REGISTRY_SERVER_URL'
                    value: 'https://${toLower(acrName)}.azurecr.io'
                }
                {
                    name: 'DOCKER_REGISTRY_SERVER_USERNAME'
                    value: acrName
                }
                {
                    name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
                    value: acrPassword
                }

            ]
        }
        httpsOnly: true
        storageAccountRequired: false
        keyVaultReferenceIdentity: 'SystemAssigned'
    }
}]

