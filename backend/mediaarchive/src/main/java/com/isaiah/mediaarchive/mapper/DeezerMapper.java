package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.DeezerResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.DeezerSearchResponseDTO;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DeezerMapper {

    private static final Logger log = LoggerFactory.getLogger(DeezerMapper.class);

    public List<BaseMediaResponseDTO> deezerResponseToBaseMediaResponseDTOList(DeezerSearchResponseDTO deezerResponse) {

        log.debug("Mapping Deezer API response data to BaseMediaResponseDTO...");

        List<BaseMediaResponseDTO> resultList = new ArrayList<>();

        for (DeezerResponseItemDTO deezerResponseItem : deezerResponse.getData()) {
            log.debug("Including media item '{}' in results list.", deezerResponseItem.getTitle());

            if (deezerResponseItem.getId() == null) {
                continue;
            }

            resultList.add(new BaseMediaResponseDTO(
                    deezerResponseItem.getId().toString(),
                    deezerResponseItem.getTitle(),
                    null,
                    MediaTypeEnum.MUSIC_ALBUM,
                    null,
                    null,
                    null,
                    deezerResponseItem.getCover_big()
            ));
        }

        return resultList;
    }
}
