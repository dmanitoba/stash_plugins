
# Stash Plugins Repository

A collection of plugins for [Stash](https://stashapp.cc/) - an organizer for your porn collection.

## Available Plugins

### Performer Rater
**Version**: 1.1.0  
**Description**: Keyboard-driven overlay to rate performers, tag, set measurements, and update images rapidly.

#### Features
- **Rapid Performer Rating**: Navigate through performers with arrow keys, rate with +/- buttons or direct input, automatically saves ratings/measurements/tags with a lightning-fast workflow
- **Smart Image Management**: Paste image URLs directly, auto-saves images to Stash database, integrated Google Images search
- **Comprehensive Data Entry**: Quick-select buttons for measurements (34C, etc), fake tits toggle, preset tag buttons for common tags like "OnlyFans"/"Pornhub", automatic tag creation

### Stats Enhancer
**Version**: 1.1.0  
**Description**: Adds country, age distribution, and timeline charts with interactive filters.

#### Features
- **Interactive Country Statistics**: Click on any country bar to see a popup with the top performers from that country, sortable by scene count or rating, with flag emojis and themed colors
- **Age Distribution Analysis**: Shows performer age distribution based on age at the date of production
- **Scene Production Timeline**: Interactive monthly timeline visualization showing scene production volumes with clickable month bars that display scene counts and allow filtering by specific time periods

## Installation

1. Download the plugin zip files from the [releases](../../releases) or build them using the build script
2. In Stash, go to Settings → Plugins
3. Click "Add Plugin" and upload the zip file
4. Enable the plugin and configure as needed

## Building

To build all plugins and generate the repository index:

```bash
./build_site.sh
```

This will create a `_site` directory with:
- `index.yml` - Plugin repository index
- `<plugin_name>.zip` - Individual plugin packages

## License

This project is licensed under [AGPL-3.0](LICENCE).