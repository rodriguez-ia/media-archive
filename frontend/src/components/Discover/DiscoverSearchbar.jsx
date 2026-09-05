import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { searchExternalMedia } from '../../services/mediaService';
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';


const DEFAULT_MEDIA_TYPES = {
  moviesAndTV: true,
  music: false,
  books: false,
};

 const mediaTypeLabels = {
    MOVIE: "Movie",
    TV_SHOW: "TV Show",
    MUSIC_ALBUM: "Music Album",
    BOOK: "Book",
};

const mockResults = [
  {
    id: '1',
    title: 'Dune',
    mediaType: 'Movie',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=200',
  },
  {
    id: '2',
    title: 'Dune',
    mediaType: 'Book',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200',
  },
  {
    id: '3',
    title: 'Dune',
    mediaType: 'Music',
    image:
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200',
  },
];

export default function DiscoverSearchBar({ onSelect, selectedItems = [] }) {
  const containerRef = useRef(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [mediaTypes, setMediaTypes] = useState(DEFAULT_MEDIA_TYPES);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [focused, setFocused] = useState(false);

  /*
   * IDs of items that have already been selected from the
   * current search. This lets us keep the dropdown open
   * while making selected results visually distinct.
   */
  const [selectedFromSearch, setSelectedFromSearch] = useState(new Set());

  /*
   * Debounced API search.
   *
   * IMPORTANT:
   * This effect only depends on searchKeyword/mediaTypes.
   *
   * Clicking a result does NOT modify either of those values,
   * so selecting an item does not trigger another search.
   */
  useEffect(() => {
    if (!searchKeyword.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setHasSearched(true);

      try {
        const response = await searchExternalMedia(
          searchKeyword,
          1,
          mediaTypes['moviesAndTV'],
          mediaTypes['music'],
          mediaTypes['books']
        );

        setResults(response.data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, mediaTypes]);

  /*
   * Close dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMediaType = (type) => {
    setMediaTypes((current) => ({
      ...current,
      [type]: !current[type],
    }));
  };

  const handleSelect = (result) => {
    /*
     * Tell DiscoverPage about the selected item.
     *
     * This does NOT change searchKeyword/results.
     */
    onSelect?.(result);

    /*
     * Mark it as selected locally so the user can still
     * see the result and select other results.
     */
    setSelectedFromSearch((current) => {
      const next = new Set(current);

      if (next.has(result.externalId)) {
        next.delete(result.externalId);
      } else {
        next.add(result.externalId);
      }

      return next;
    });
  };

  const isSelected = (result) => {
    return (
      selectedFromSearch.has(result.externalId) ||
      selectedItems.some((item) => item.id === result.id)
    );
  };

  const showDropdown =
    focused && searchKeyword.trim().length > 0;

  const allDisabled =
    !mediaTypes.moviesAndTV &&
    !mediaTypes.music &&
    !mediaTypes.books;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        mx: 'auto'
      }}
    >
      {/* Search bar */}
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 56,
          px: 1.5,
          border: '1px solid',
          borderColor: focused
            ? 'primary.main'
            : 'divider',
          borderRadius: 2,
          transition: 'border-color 120ms ease, box-shadow 120ms ease',
          boxShadow: focused
            ? '0 0 0 1px rgba(25, 118, 210, 0.15)'
            : 'none',
          bgcolor: 'background.paper',
        }}
      >
        <SearchIcon
          sx={{
            color: focused
              ? 'primary.main'
              : 'text.secondary',
            mr: 1.25,
            transition: 'color 120ms ease',
          }}
        />

        <InputBase
          fullWidth
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search movies/TV, music, books..."
          sx={{
            flex: 1,
            fontSize: '1rem',
            minWidth: 0,
          }}
          inputProps={{
            'aria-label': 'Search media',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.25,
            ml: 1,
            flexShrink: 0,
          }}
        >
          <MediaTypeButton
            active={mediaTypes.moviesAndTV}
            label="Movies & TV"
            onClick={() => toggleMediaType('moviesAndTV')}
          >
            <MovieOutlinedIcon fontSize="small" />
          </MediaTypeButton>

          <MediaTypeButton
            active={mediaTypes.music}
            label="Music"
            onClick={() => toggleMediaType('music')}
          >
            <MusicNoteOutlinedIcon fontSize="small" />
          </MediaTypeButton>

          <MediaTypeButton
            active={mediaTypes.books}
            label="Books"
            onClick={() => toggleMediaType('books')}
          >
            <MenuBookOutlinedIcon fontSize="small" />
          </MediaTypeButton>
        </Box>
      </Paper>

      {/* Dropdown */}
      {showDropdown && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1300,
            maxHeight: 500,
            overflow: 'hidden',
            overflowY: 'auto',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          {loading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                py: 3,
              }}
            >
              <CircularProgress size={20} />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Searching...
              </Typography>
            </Box>
          )}

          {!loading &&
            hasSearched &&
            results.length === 0 && (
              <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  No results found
                </Typography>
              </Box>
            )}

          {!loading &&
            results.length > 0 && (
              <List disablePadding>
                {results.map((result, index) => (
                  <React.Fragment key={result.id}>
                    {index > 0 && <Divider />}

                    <SearchResult
                      result={result}
                      selected={isSelected(result)}
                      onClick={() => handleSelect(result)}
                    />
                  </React.Fragment>
                ))}
              </List>
            )}

          {allDisabled && (
            <Box sx={{ py: 2, px: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Select at least one media type.
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}

/*
 * Media type toggle button
 */
function MediaTypeButton({
  active,
  label,
  onClick,
  children,
}) {
  return (
    <Tooltip title={label} arrow>
      <IconButton
        size="small"
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
        sx={{
          width: 34,
          height: 34,
          borderRadius: 1.5,
          color: active
            ? 'primary.main'
            : 'text.disabled',
          bgcolor: active
            ? 'primary.50'
            : 'transparent',
          transition:
            'background-color 120ms ease, color 120ms ease',

          '&:hover': {
            bgcolor: active
              ? 'primary.100'
              : 'action.hover',
            color: active
              ? 'primary.main'
              : 'text.secondary',
          },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

/*
 * Individual search result
 */
function SearchResult({
  result,
  selected,
  onClick,
}) {
  return (
    <ListItemButton
      onClick={onClick}
      selected={selected}
      sx={{
        px: 1.5,
        py: 1,
        gap: 1.5,
        minHeight: 76,

        '&.Mui-selected': {
          bgcolor: 'action.selected',
        },

        '&.Mui-selected:hover': {
          bgcolor: 'action.selected',
        },
      }}
    >
      <Box
        component="img"
        src={result.coverImgUrl}
        alt=""
        sx={{
          width: 48,
          height: 64,
          objectFit: 'cover',
          borderRadius: 1,
          flexShrink: 0,
          bgcolor: 'action.hover',
        }}
      />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={500}
          noWrap
        >
          {result.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
        >
          {mediaTypeLabels[result.mediaType]}
        </Typography>
      </Box>

      {selected && (
        <CheckIcon
          fontSize="small"
          color="primary"
          sx={{ mr: 0.5 }}
        />
      )}
    </ListItemButton>
  );
}
