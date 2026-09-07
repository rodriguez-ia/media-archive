package com.isaiah.mediaarchive.mapper;

import com.isaiah.mediaarchive.model.dto.BaseMediaResponseDTO;
import com.isaiah.mediaarchive.model.dto.GoogleBooksResponseItemDTO;
import com.isaiah.mediaarchive.model.dto.GoogleBooksSearchResponseDTO;
import com.isaiah.mediaarchive.model.enums.GenreEnum;
import com.isaiah.mediaarchive.model.enums.MediaTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GoogleBooksMapper {

    private static final Logger log = LoggerFactory.getLogger(GoogleBooksMapper.class);

    public List<BaseMediaResponseDTO> googleBooksResponseToBaseMediaResponseDTOList(GoogleBooksSearchResponseDTO googleBooksResponse) {

        log.debug("Mapping Google Books API response data to BaseMediaResponseDTO...");

        List<BaseMediaResponseDTO> resultList = new ArrayList<>();

        for (GoogleBooksResponseItemDTO googleBooksResponseItem : googleBooksResponse.getItems()) {
            log.debug("Including media item '{}' in results list.", googleBooksResponseItem.getVolumeInfo().getTitle());

            if (googleBooksResponseItem.getId() == null || googleBooksResponseItem.getId().isBlank() || googleBooksResponseItem.getVolumeInfo() == null) {
                continue;
            }

            String ImgLink = null;

            if (googleBooksResponseItem.getVolumeInfo().getImageLinks() != null) {
                ImgLink = googleBooksResponseItem.getVolumeInfo().getImageLinks().getThumbnail();
            }

            resultList.add(new BaseMediaResponseDTO(
                    googleBooksResponseItem.getId(),
                    googleBooksResponseItem.getVolumeInfo().getTitle(),
                    googleBooksResponseItem.getVolumeInfo().getDescription(),
                    MediaTypeEnum.BOOK,
                    mapGoogleBooksCategories(googleBooksResponseItem.getVolumeInfo().getCategories()),
                    parsePublishedDate(googleBooksResponseItem.getVolumeInfo().getPublishedDate()),
                    null,
                    editCoverImgUrl(ImgLink)
            ));
        }

        return resultList;
    }

    private Set<GenreEnum> mapGoogleBooksCategories(List<String> categories) {

        if (categories == null) {
            return Set.of(GenreEnum.OTHER);
        }

        return categories.stream()
                .map(this::mapGoogleBooksCategory)
                .collect(Collectors.toSet());
    }

    private GenreEnum mapGoogleBooksCategory(String category) {

        String normalized = category.toLowerCase();

        if (normalized.contains("science fiction")) {
            return GenreEnum.SCIENCE_FICTION;
        }
        if (normalized.contains("fantasy")) {
            return GenreEnum.FANTASY;
        }
        if (normalized.contains("mystery") || normalized.contains("detective")) {
            return GenreEnum.MYSTERY;
        }
        if (normalized.contains("thriller")) {
            return GenreEnum.THRILLER;
        }
        if (normalized.contains("romance")) {
            return GenreEnum.ROMANCE;
        }
        if (normalized.contains("horror")) {
            return GenreEnum.HORROR;
        }
        if (normalized.contains("crime")) {
            return GenreEnum.CRIME;
        }
        if (normalized.contains("biography") || normalized.contains("autobiography")) {
            return GenreEnum.BIOGRAPHY;
        }
        if (normalized.contains("business") || normalized.contains("economics")) {
            return GenreEnum.BUSINESS;
        }
        if (normalized.contains("history") || normalized.contains("historical")) {
            return GenreEnum.HISTORY;
        }
        if (normalized.contains("sports") || normalized.contains("recreation")) {
            return GenreEnum.SPORTS;
        }
        if (normalized.contains("music")) {
            return GenreEnum.MUSIC;
        }
        if (normalized.contains("political")) {
            return GenreEnum.POLITICS;
        }
        if (normalized.contains("religion")) {
            return GenreEnum.RELIGION;
        }
        if (normalized.contains("young adult")) {
            return GenreEnum.YOUNG_ADULT;
        }
        if (normalized.contains("juvenile") || normalized.contains("children")) {
            return GenreEnum.KIDS;
        }

        return GenreEnum.OTHER;
    }

    private LocalDate parsePublishedDate(String publishedDate) {

        if (publishedDate == null || publishedDate.isBlank()) {
            return null;
        }

        LocalDate result;
        String[] parts = publishedDate.split("-");

        if (parts.length == 3) {
            result = LocalDate.parse(publishedDate);
        } else if (parts.length == 2) {
            result = LocalDate.of(
                    Integer.parseInt(parts[0]),
                    Integer.parseInt(parts[1]),
                    1
            );
        } else if (parts.length == 1) {
            result = LocalDate.of(
                    Integer.parseInt(parts[0]),
                    1,
                    1
            );
        } else {
            return null;
        }

        return result;
    }

    private String editCoverImgUrl(String url) {

        if (url == null || url.isBlank()) {
            return "";
        }

        if (url.startsWith("http://")) {
            url = "https://" + url.substring(7);
        }

        // Set the 'zoom' query param to 10 for a higher res image.
        url = url.replaceFirst("zoom=\\d+", "zoom=10");

        return url;
    }
}
