package com.wfiis.CalculatorCO2.resource.metadata;

import com.wfiis.CalculatorCO2.resource.metadata.entity.Resource;
import com.wfiis.CalculatorCO2.resource.model.ResourceModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ResourceAssembler {
    public ResourceModel getModelFromEntity(Resource resource) {
        return new ResourceModel(
                resource.getName(),
                resource.getGus(),
                resource.getId()
        );
    }

    public List<ResourceModel> getModelsFromEntityList(List<Resource> resources) {
        List<ResourceModel> outResources = new ArrayList<>();
        for (Resource resource : resources) {
            outResources.add(getModelFromEntity(resource));
        }
        return outResources;
    }
}
