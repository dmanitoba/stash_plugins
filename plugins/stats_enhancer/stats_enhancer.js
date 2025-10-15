// Stats Enhancer Plugin - Interactive country performer stats

class StatsEnhancer {
    constructor() {
        // Country mapping with full names as keys
        this.countryCodes = {
            'United States': { code: 'US', demonym: 'American', colors: ['#B22234', '#FFFFFF', '#3C3B6E'] },
            'United Kingdom': { code: 'GB', demonym: 'British', colors: ['#012169', '#FFFFFF', '#C8102E'] },
            'Canada': { code: 'CA', demonym: 'Canadian', colors: ['#FF0000', '#FFFFFF', '#FF0000'] },
            'Germany': { code: 'DE', demonym: 'German', colors: ['#000000', '#DD0000', '#FFCE00'] },
            'France': { code: 'FR', demonym: 'French', colors: ['#0055A4', '#FFFFFF', '#EF4135'] },
            'Russia': { code: 'RU', demonym: 'Russian', colors: ['#FFFFFF', '#0039A6', '#D52B1E'] },
            'Ukraine': { code: 'UA', demonym: 'Ukrainian', colors: ['#005BBB', '#FFD500'] },
            'Japan': { code: 'JP', demonym: 'Japanese', colors: ['#BC002D', '#FFFFFF'] },
            'Brazil': { code: 'BR', demonym: 'Brazilian', colors: ['#009739', '#FEDD00', '#012169'] },
            'Italy': { code: 'IT', demonym: 'Italian', colors: ['#009246', '#FFFFFF', '#CE2B37'] },
            'Spain': { code: 'ES', demonym: 'Spanish', colors: ['#AA151B', '#F1BF00'] },
            'Australia': { code: 'AU', demonym: 'Australian', colors: ['#012169', '#FFFFFF', '#E4002B'] },
            'Czech Republic': { code: 'CZ', demonym: 'Czech', colors: ['#11457E', '#FFFFFF', '#D7141A'] },
            'Poland': { code: 'PL', demonym: 'Polish', colors: ['#FFFFFF', '#DC143C'] },
            'Netherlands': { code: 'NL', demonym: 'Dutch', colors: ['#21468B', '#FFFFFF', '#AE1C28'] },
            'Sweden': { code: 'SE', demonym: 'Swedish', colors: ['#006AA7', '#FECC00'] },
            'Hungary': { code: 'HU', demonym: 'Hungarian', colors: ['#CD212A', '#FFFFFF', '#436F4D'] },
            'Romania': { code: 'RO', demonym: 'Romanian', colors: ['#002B7F', '#FCD116', '#CE1126'] },
            'Slovakia': { code: 'SK', demonym: 'Slovak', colors: ['#FFFFFF', '#0B4EA2', '#EE1C25'] },
            'Argentina': { code: 'AR', demonym: 'Argentine', colors: ['#74ACDF', '#FFFFFF', '#74ACDF'] },
            'Colombia': { code: 'CO', demonym: 'Colombian', colors: ['#FDE047', '#0038A8', '#CE1126'] },
            'Mexico': { code: 'MX', demonym: 'Mexican', colors: ['#006847', '#FFFFFF', '#CE1126'] },
            'Venezuela': { code: 'VE', demonym: 'Venezuelan', colors: ['#FFCC00', '#0033A0', '#CF142B'] },
            'Thailand': { code: 'TH', demonym: 'Thai', colors: ['#ED1C24', '#FFFFFF', '#241D4F'] },
            'Philippines': { code: 'PH', demonym: 'Filipino', colors: ['#0038A8', '#CE1126', '#FCD116'] },
            'South Korea': { code: 'KR', demonym: 'Korean', colors: ['#FFFFFF', '#C60C30', '#003478'] },
            'China': { code: 'CN', demonym: 'Chinese', colors: ['#DE2910', '#FFDE00'] },
            'India': { code: 'IN', demonym: 'Indian', colors: ['#FF9933', '#FFFFFF', '#138808'] },
            'Turkey': { code: 'TR', demonym: 'Turkish', colors: ['#E30A17', '#FFFFFF'] },
            'Greece': { code: 'GR', demonym: 'Greek', colors: ['#0D5EAF', '#FFFFFF'] },
            'Portugal': { code: 'PT', demonym: 'Portuguese', colors: ['#046A38', '#DA020E'] },
            'Belgium': { code: 'BE', demonym: 'Belgian', colors: ['#000000', '#FFD700', '#ED2939'] },
            'Austria': { code: 'AT', demonym: 'Austrian', colors: ['#ED2939', '#FFFFFF', '#ED2939'] },
            'Switzerland': { code: 'CH', demonym: 'Swiss', colors: ['#DA020E', '#FFFFFF'] },
            'Norway': { code: 'NO', demonym: 'Norwegian', colors: ['#EF2B2D', '#FFFFFF', '#002868'] },
            'Denmark': { code: 'DK', demonym: 'Danish', colors: ['#C8102E', '#FFFFFF'] },
            'Finland': { code: 'FI', demonym: 'Finnish', colors: ['#FFFFFF', '#003580'] },
            'Fiji': { code: 'FJ', demonym: 'Fijian', colors: ['#68BFE5', '#FFFFFF', '#CE1126'] },
            'Latvia': { code: 'LV', demonym: 'Latvian', colors: ['#9E1B34', '#FFFFFF', '#9E1B34'] },
            'Lithuania': { code: 'LT', demonym: 'Lithuanian', colors: ['#FDB913', '#006A44', '#C1272D'] },
            'Estonia': { code: 'EE', demonym: 'Estonian', colors: ['#0072CE', '#000000', '#FFFFFF'] },
            'Slovenia': { code: 'SI', demonym: 'Slovenian', colors: ['#FFFFFF', '#0000FF', '#FF0000'] },
            'Croatia': { code: 'HR', demonym: 'Croatian', colors: ['#FF0000', '#FFFFFF', '#171796'] },
            'Serbia': { code: 'RS', demonym: 'Serbian', colors: ['#C6363C', '#0C4076', '#FFFFFF'] },
            'Bulgaria': { code: 'BG', demonym: 'Bulgarian', colors: ['#FFFFFF', '#00966E', '#D62612'] },
            'Ireland': { code: 'IE', demonym: 'Irish', colors: ['#009A49', '#FFFFFF', '#FF7900'] },
            'South Africa': { code: 'ZA', demonym: 'South African', colors: ['#000000', '#FFB612', '#DE3831'] },
            'New Zealand': { code: 'NZ', demonym: 'New Zealander', colors: ['#012169', '#FFFFFF', '#CC142B'] },
            'Israel': { code: 'IL', demonym: 'Israeli', colors: ['#FFFFFF', '#0038B8'] },
            'Puerto Rico': { code: 'PR', demonym: 'Puerto Rican', colors: ['#ED1C24', '#FFFFFF', '#0050A0'] },
            'Kazakhstan': { code: 'KZ', demonym: 'Kazakh', colors: ['#00AFCA', '#FEC50C'] },
            'Vietnam': { code: 'VN', demonym: 'Vietnamese', colors: ['#DA020E', '#FFFF00'] },
            'Belarus': { code: 'BY', demonym: 'Belarusian', colors: ['#009A44', '#CE1126', '#FFFFFF'] },
            'Cuba': { code: 'CU', demonym: 'Cuban', colors: ['#002A8F', '#FFFFFF', '#CF142B'] },
            'Moldova': { code: 'MD', demonym: 'Moldovan', colors: ['#0033A0', '#FFCC00', '#CE1126'] },
            'Taiwan': { code: 'TW', demonym: 'Taiwanese', colors: ['#FE0000', '#FFFFFF', '#000095'] },
            'Dominican Republic': { code: 'DO', demonym: 'Dominican', colors: ['#002D62', '#CE1126', '#FFFFFF'] },
            'Chile': { code: 'CL', demonym: 'Chilean', colors: ['#FFFFFF', '#0039A6', '#D52B1E'] },
            'Peru': { code: 'PE', demonym: 'Peruvian', colors: ['#D91023', '#FFFFFF', '#D91023'] },
            'El Salvador': { code: 'SV', demonym: 'Salvadoran', colors: ['#0047AB', '#FFFFFF', '#0047AB'] },
            'Uruguay': { code: 'UY', demonym: 'Uruguayan', colors: ['#FFFFFF', '#0038A8', '#FFCC00'] },
            'Georgia': { code: 'GE', demonym: 'Georgian', colors: ['#FFFFFF', '#FF0000', '#FFFFFF'] },
            'Ecuador': { code: 'EC', demonym: 'Ecuadorian', colors: ['#FFD100', '#0072CE', '#EF3340'] },
            'India': { code: 'IN', demonym: 'Indian', colors: ['#FF9933', '#FFFFFF', '#138808'] },
            'Panama': { code: 'PA', demonym: 'Panamanian', colors: ['#DA121A', '#FFFFFF', '#0033A0'] },
            'Mongolia': { code: 'MN', demonym: 'Mongolian', colors: ['#C4272F', '#015197', '#C4272F'] },
            'Syria': { code: 'SY', demonym: 'Syrian', colors: ['#CE1126', '#FFFFFF', '#007A3D'] },
            'Morocco': { code: 'MA', demonym: 'Moroccan', colors: ['#C1272D', '#006233'] },
            'Albania': { code: 'AL', demonym: 'Albanian', colors: ['#E41E20', '#000000'] },
            'Iceland': { code: 'IS', demonym: 'Icelandic', colors: ['#02529C', '#FFFFFF', '#DC1E35'] },
            'Lebanon': { code: 'LB', demonym: 'Lebanese', colors: ['#EE161F', '#FFFFFF', '#00A651'] },
            'Kenya': { code: 'KE', demonym: 'Kenyan', colors: ['#000000', '#FFFFFF', '#006600'] },
            'Kyrgyzstan': { code: 'KG', demonym: 'Kyrgyz', colors: ['#E8112D', '#FFEF00'] },
            'Lao People\'s Democratic Republic': { code: 'LA', demonym: 'Lao', colors: ['#CE1126', '#FFFFFF', '#002868'] },
            'Indonesia': { code: 'ID', demonym: 'Indonesian', colors: ['#FF0000', '#FFFFFF'] },
            'Singapore': { code: 'SG', demonym: 'Singaporean', colors: ['#EF3340', '#FFFFFF'] },
            'Bolivia': { code: 'BO', demonym: 'Bolivian', colors: ['#D52B1E', '#F9E300', '#007934'] },
            'Virgin Islands': { code: 'VI', demonym: 'Virgin Islander', colors: ['#FFFFFF', '#0047AB', '#FFD100'] },
            'Luxembourg': { code: 'LU', demonym: 'Luxembourgish', colors: ['#ED2939', '#FFFFFF', '#00A1DE'] },
            'Sudan': { code: 'SD', demonym: 'Sudanese', colors: ['#D21034', '#FFFFFF', '#000000'] },
            'Pakistan': { code: 'PK', demonym: 'Pakistani', colors: ['#01411C', '#FFFFFF', '#01411C'] },
            'Korea, Republic of': { code: 'KR', demonym: 'Korean', colors: ['#FFFFFF', '#C60C30', '#003478'] },
            'Belize': { code: 'BZ', demonym: 'Belizean', colors: ['#CE1126', '#003F87', '#FFFFFF'] },
            'Haiti': { code: 'HT', demonym: 'Haitian', colors: ['#00209F', '#D21034'] },
            'Hong Kong': { code: 'HK', demonym: 'Hong Konger', colors: ['#DE2910', '#FFFFFF'] },
            'Micronesia': { code: 'FM', demonym: 'Micronesian', colors: ['#75B2DD', '#FFFFFF'] },
            'Tajikistan': { code: 'TJ', demonym: 'Tajik', colors: ['#CC0000', '#FFFFFF', '#006600'] },
            'Armenia': { code: 'AM', demonym: 'Armenian', colors: ['#D90012', '#0033A0', '#F2A800'] },
            'Malta': { code: 'MT', demonym: 'Maltese', colors: ['#FFFFFF', '#CF142B'] },
            'Iran (Islamic Republic of)': { code: 'IR', demonym: 'Iranian', colors: ['#239F40', '#FFFFFF', '#DA0000'] },
            'Rwanda': { code: 'RW', demonym: 'Rwandan', colors: ['#00A1DE', '#FAD201', '#20603D'] },
            'Togo': { code: 'TG', demonym: 'Togolese', colors: ['#006A4E', '#FFFFFF', '#D21034'] },
            'Guatemala': { code: 'GT', demonym: 'Guatemalan', colors: ['#4997D0', '#FFFFFF', '#4997D0'] },
            'Paraguay': { code: 'PY', demonym: 'Paraguayan', colors: ['#D52B1E', '#FFFFFF', '#0038A8'] },
            'Maldives': { code: 'MV', demonym: 'Maldivian', colors: ['#D21034', '#007E3A', '#FFFFFF'] },
            'Cyprus': { code: 'CY', demonym: 'Cypriot', colors: ['#FFFFFF', '#D57800'] },
            'Jamaica': { code: 'JM', demonym: 'Jamaican', colors: ['#009B3A', '#FED100', '#000000'] },
            'Bosnia and Herzegovina': { code: 'BA', demonym: 'Bosnian', colors: ['#002395', '#FECB00', '#FFFFFF'] },
            'Yugoslavia': { code: 'YU', demonym: 'Yugoslav', colors: ['#0C4076', '#FFFFFF', '#DE0000'] },
            'Bangladesh': { code: 'BD', demonym: 'Bangladeshi', colors: ['#006A4E', '#F42A41'] },
            'Central African Republic': { code: 'CF', demonym: 'Central African', colors: ['#003082', '#FFFFFF', '#289728'] },
            'Guam': { code: 'GU', demonym: 'Guamanian', colors: ['#EF3340', '#002868', '#FFFFFF'] },
            'Uzbekistan': { code: 'UZ', demonym: 'Uzbek', colors: ['#0099B5', '#FFFFFF', '#1EB53A'] },
            'Iraq': { code: 'IQ', demonym: 'Iraqi', colors: ['#CE1126', '#FFFFFF', '#007A3D'] },
            'Saudi Arabia': { code: 'SA', demonym: 'Saudi', colors: ['#165B31', '#FFFFFF'] },
            'Costa Rica': { code: 'CR', demonym: 'Costa Rican', colors: ['#002B7F', '#FFFFFF', '#CE1126'] },
            'Honduras': { code: 'HN', demonym: 'Honduran', colors: ['#0073CF', '#FFFFFF', '#0073CF'] },
            'Mauritius': { code: 'MU', demonym: 'Mauritian', colors: ['#EA2839', '#1A206D', '#FFD100'] },
            'Slovakia (Slovak Republic)': { code: 'SK', demonym: 'Slovak', colors: ['#FFFFFF', '#0B4EA2', '#EE1C25'] },
            'Afghanistan': { code: 'AF', demonym: 'Afghan', colors: ['#000000', '#D32011', '#007A3D'] },
            'Algeria': { code: 'DZ', demonym: 'Algerian', colors: ['#006233', '#FFFFFF', '#D21034'] },
        };
        
        // Code to full name mapping for reverse lookup
        this.codeToName = {};
        Object.entries(this.countryCodes).forEach(([name, info]) => {
            this.codeToName[info.code] = name;
        });
        
        // Cache for scene ages to avoid recalculation
        this.sceneAgeCache = new Map();
        
        this.init();
    }

    // Safely escape text for HTML insertion
    escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Convert ISO country code to flag emoji
    getFlagEmoji(code) {
        if (!code) return '';
        const base = 127397;
        return code.replace(/./g, c => String.fromCodePoint(base + c.charCodeAt(0)));
    }

    // Helper method to get country info by name or code - case insensitive
    getCountryInfo(countryKey) {
        if (!countryKey) return null;
        
        const normalized = countryKey.trim().toUpperCase();
        
        // Try exact match first (for full country names)
        if (this.countryCodes[countryKey]) return this.countryCodes[countryKey];
        
        // Try code lookup (2-letter codes)
        if (this.codeToName[normalized]) {
            const fullName = this.codeToName[normalized];
            if (this.countryCodes[fullName]) return this.countryCodes[fullName];
        }
        
        // Try case-insensitive full name match
        const fullNameMatch = Object.keys(this.countryCodes).find(
            name => name.toUpperCase() === normalized
        );
        if (fullNameMatch) return this.countryCodes[fullNameMatch];
        
        return null;
    }

    // Determine if cached data should refresh weekly at 4am Sunday
    shouldRefreshWeeklyCache(cacheTime) {
        try {
            if (!cacheTime) return true;
            const last = new Date(parseInt(cacheTime, 10));
            if (isNaN(last.getTime())) return true;
            const now = new Date();
            // Find next Sunday 4am after 'last'
            const next = new Date(last);
            next.setHours(4, 0, 0, 0);
            while (next.getDay() !== 0 || next <= last) {
                next.setDate(next.getDate() + 1);
            }
            return now >= next;
        } catch {
            return true;
        }
    }

    // Determine if timeline cache should refresh (daily for current month, weekly for historical)
    shouldRefreshTimelineCache(cacheTime) {
        try {
            if (!cacheTime) return true;
            const last = new Date(parseInt(cacheTime, 10));
            if (isNaN(last.getTime())) return true;
            const now = new Date();
            
            // Get current month start
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            
            // If cache is from before current month started, refresh (new month)
            if (last < currentMonthStart) {
                console.log('[Stats Enhancer] Timeline cache refresh: New month detected');
                return true;
            }
            
            // If we're in the current month, refresh daily at 4am
            const lastMidnight = new Date(last);
            lastMidnight.setHours(4, 0, 0, 0);
            
            // If last cache was before today's 4am, refresh
            const todayFourAM = new Date(now);
            todayFourAM.setHours(4, 0, 0, 0);
            
            if (now >= todayFourAM && last < todayFourAM) {
                console.log('[Stats Enhancer] Timeline cache refresh: Daily refresh for current month');
                return true;
            }
            
            // Otherwise use weekly refresh like other charts
            return this.shouldRefreshWeeklyCache(cacheTime);
            
        } catch {
            return true;
        }
    }

    // Get scene ages for a performer (cached)
    async getPerformerSceneAges(performer) {
        const cacheKey = `scene_ages_${performer.id}`;
        if (this.sceneAgeCache.has(cacheKey)) {
            return this.sceneAgeCache.get(cacheKey);
        }

        try {
            const query = `
                query($performer_id: ID!) {
                    findScenes(
                        scene_filter: { performers: { value: [$performer_id], modifier: INCLUDES } }
                        filter: { per_page: -1 }
                    ) {
                        scenes {
                            date
                        }
                    }
                }
            `;
            
            const response = await this.fetchGraphQL(query, { performer_id: performer.id });
            const scenes = response.data.findScenes.scenes || [];
            
            const birthDate = new Date(performer.birthdate);
            const ages = scenes
                .filter(scene => scene.date)
                .map(scene => {
                    const sceneDate = new Date(scene.date);
                    const ageAtScene = Math.floor((sceneDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
                    return ageAtScene;
                })
                .filter(age => age >= 18 && age <= 80);

            this.sceneAgeCache.set(cacheKey, ages);
            return ages;
            
        } catch (error) {
            console.warn(`[Stats Enhancer] Error fetching scene ages for ${performer.name}:`, error);
            const fallbackAges = [];
            this.sceneAgeCache.set(cacheKey, fallbackAges);
            return fallbackAges;
        }
    }

    // Normalize scenes and ratings from performer data
    getScenes(performer) {
        if (!performer) return 0;
        
        // Try scene_count first
        if (typeof performer.scene_count === 'number' && Number.isFinite(performer.scene_count)) {
            return performer.scene_count;
        }
        
        // Handle string scene_count
        if (typeof performer.scene_count === 'string' && performer.scene_count.trim()) {
            const parsed = parseInt(performer.scene_count.replace(/[^0-9]/g, ''), 10);
            if (Number.isFinite(parsed) && parsed >= 0) return parsed;
        }
        
        return 0;
    }

    getRating10(performer) {
        if (!performer) return null;
        
        // Convert rating100 field from 0-100 to 0-10 scale
        if (typeof performer.rating100 === 'number' && Number.isFinite(performer.rating100)) {
            return Math.max(0, Math.min(10, performer.rating100 / 10));
        }
        
        return null;
    }

    // Add hover/click events for country rows
    addCountryHoverEvents() {
        document.querySelectorAll('.country-row').forEach(row => {
            row.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showCountryPerformers(row);
            });
        });
        
        // Close on outside click or Escape
        document.addEventListener('click', (e) => {
            // Don't close if clicking on sort buttons, but allow close button to work
            if (e.target.closest('.sort-scenes, .sort-rating')) {
                return;
            }
            
            document.querySelectorAll('.country-hover-popup').forEach(p => {
                if (!p.contains(e.target) && p.style.display === 'block') {
                    p.style.display = 'none';
                    p.dataset.sticky = 'false';
                }
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.country-hover-popup').forEach(p => {
                    p.style.display = 'none';
                    p.dataset.sticky = 'false';
                });
            }
        });
    }

    // Main popup renderer with efficient server-side sorting
    async showCountryPerformers(countryRow) {
        const country = countryRow.getAttribute('data-country');
        const limit = parseInt(countryRow.getAttribute('data-limit'), 10) || 24;
        const totalCount = parseInt(countryRow.getAttribute('data-total-count'), 10) || limit;
        const popup = countryRow.querySelector('.country-hover-popup');
        
        // Toggle visibility - but stay open if this is a sort mode change
        const wasVisible = popup.style.display === 'block';
        const isSticky = popup.dataset.sticky === 'true';
        
        document.querySelectorAll('.country-hover-popup').forEach(p => { 
            if (p !== popup || !isSticky) {
                p.style.display = 'none'; 
                p.dataset.sticky = 'false'; 
            }
        });
        
        // If it was visible and we're not in sticky mode (sort change), toggle off and return
        if (wasVisible && !isSticky) {
            popup.style.display = 'none';
            return;
        }
        
        // Ensure popup is visible
        popup.style.display = 'block';

        // Center the popup horizontally, let CSS handle vertical positioning
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        popup.style.left = `${(viewportWidth - popup.offsetWidth) / 2}px`;
        popup.style.top = '5vh';

        // Get requested sort mode
        const requestedSortMode = popup.dataset.sortMode || 'scenes';

        // Loading state
        popup.innerHTML = '<div class="popup-loading">Loading top performers...</div>';

        try {
            let performers = [];
            // console.log(`[Stats Enhancer] Loading ${requestedSortMode} data for ${country} (limit: ${limit})`);
            
            // Get selected genders from filter
            let selectedGenders = ['FEMALE']; // Default to female only if nothing saved
            const savedGenderFilter = localStorage.getItem('stats_enhancer_gender_filter');
            if (savedGenderFilter) {
                try {
                    const parsed = JSON.parse(savedGenderFilter);
                    // Accept empty array - user deliberately deselected all
                    if (Array.isArray(parsed)) {
                        selectedGenders = parsed;
                    }
                } catch (e) {
                    console.warn('[Stats Enhancer] Failed to parse gender filter:', e);
                }
            }
            
            // Don't show popup if no genders are selected
            if (selectedGenders.length === 0) {
                // console.log('[Stats Enhancer] No genders selected, skipping popup');
                popup.innerHTML = '<div class="popup-error">Select at least one gender to view performers</div>';
                return;
            }
            
            // Skip server-side sorting entirely to avoid 422 errors
            // Use larger sample sizes and sort client-side for accuracy
            
            if (country === 'Unknown') {
                // For Unknown: get all performers and filter client-side (no direct GraphQL filter for "no country")
                const query = `
                    query {
                        findPerformers(
                            filter: { per_page: -1 }
                        ) {
                            performers {
                                id
                                name
                                image_path
                                scene_count
                                rating100
                                gender
                                country
                            }
                        }
                    }
                `;
                
                // console.log(`[Stats Enhancer] Fetching ALL ${requestedSortMode} data for Unknown country...`);
                const response = await this.fetchGraphQL(query);
                performers = (response.data.findPerformers.performers || []);
                
                // Filter to unknown country, selected genders, and performers with scenes
                performers = performers.filter(p => 
                    (!p.country || !p.country.trim()) && 
                    selectedGenders.includes(p.gender) && 
                    this.getScenes(p) > 0
                );
                
                // Sort client-side since we can't sort filtered results on server
                if (requestedSortMode === 'rating') {
                    performers.sort((a, b) => (this.getRating10(b) || 0) - (this.getRating10(a) || 0));
                } else {
                    performers.sort((a, b) => this.getScenes(b) - this.getScenes(a));
                }
                
                performers = performers.slice(0, limit);
                // console.log(`[Stats Enhancer] Got ${performers.length} unknown country performers`);
                
            } else {
                // For specific countries: fetch ALL performers without limit
                const sortField = requestedSortMode === 'rating' ? 'rating' : 'scenes_count';
                const query = `
                    query($country: String!) {
                        findPerformers(
                            performer_filter: { 
                                country: { modifier: EQUALS, value: $country }
                            },
                            filter: { 
                                per_page: -1,
                                sort: "${sortField}",
                                direction: DESC
                            }
                        ) {
                            performers {
                                id
                                name
                                image_path
                                scene_count
                                rating100
                                gender
                                country
                            }
                        }
                    }
                `;
                
                // console.log(`[Stats Enhancer] Fetching ALL ${requestedSortMode} data for ${country}...`);
                
                const response = await this.fetchGraphQL(query, { country });
                performers = (response.data.findPerformers.performers || []);
                
                // console.log(`[Stats Enhancer] Fetched ${performers.length} total performers from ${country}`);
                
                // Filter to selected genders first
                performers = performers.filter(p => selectedGenders.includes(p.gender));
                
                // console.log(`[Stats Enhancer] After gender filter: ${performers.length} performers matching ${selectedGenders.join(', ')}`);
                
                // Filter out zero-scene performers if sorting by scenes
                if (requestedSortMode === 'scenes') {
                    performers = performers.filter(p => this.getScenes(p) > 0);
                }
                
                // Client-side sort since we filtered by gender after server query
                if (requestedSortMode === 'rating') {
                    performers.sort((a, b) => (this.getRating10(b) || 0) - (this.getRating10(a) || 0));
                } else {
                    performers.sort((a, b) => this.getScenes(b) - this.getScenes(a));
                }
                
                performers = performers.slice(0, limit);
                // console.log(`[Stats Enhancer] Got ${performers.length} performers for ${country}`);
            }

            // console.log(`[Stats Enhancer] Final result: ${performers.length} performers for ${country} (${requestedSortMode})`);
            if (performers.length > 0) {
                const first = performers[0];
                const last = performers[performers.length - 1];
                if (requestedSortMode === 'rating') {
                    // console.log(`[Stats Enhancer] Rating range: ${this.getRating10(first)?.toFixed(1)} to ${this.getRating10(last)?.toFixed(1)}`);
                } else {
                    // console.log(`[Stats Enhancer] Scene count range: ${this.getScenes(first)} to ${this.getScenes(last)}`);
                }
            }

            // Render the popup with the performers
            const displayName = countryRow.dataset.countryDisplay || country;
            const demonym = countryRow.dataset.demonym || displayName;
            const flagCode = (countryRow.dataset.flag || '').toUpperCase();
            
            // Determine plural noun based on selected genders (already loaded earlier in function)
            let pluralNoun = 'Performers'; // Default fallback
            
            // Only determine specific noun if we have selected genders (safety check)
            if (selectedGenders && selectedGenders.length > 0) {
                const hasMale = selectedGenders.includes('MALE');
                const hasFemale = selectedGenders.includes('FEMALE');
                const hasTrans = selectedGenders.some(g => ['TRANSGENDER_FEMALE', 'TRANSGENDER_MALE', 'INTERSEX', 'NON_BINARY'].includes(g));
                
                if (hasMale && !hasFemale && !hasTrans) {
                    // Male only
                    pluralNoun = 'Cocks';
                } else if (hasTrans && !hasMale && !hasFemale) {
                    // Trans only
                    pluralNoun = 'Shemales';
                } else if (hasFemale) {
                    // Female (with or without others) - use original female logic
                    pluralNoun = (flagCode === 'US' || flagCode === 'RU') ? 'Whores' : 'Sluts';
                }
            }
            
            const modeNote = requestedSortMode === 'rating' ? ' ~ Top Rated' : ' ~ Most Scenes';
            const countText = performers.length === totalCount ? `All ${performers.length}` : `Top ${performers.length}`;
            
            let html = `
                <div class="popup-header">
                    <span class="popup-header-title">${countText} ${this.escapeHtml(demonym)} ${pluralNoun}${modeNote}</span>
                    <div class="popup-header-buttons">
                        <button class="sort-scenes sort-btn${requestedSortMode === 'scenes' ? ' active' : ''}" title="Sort by scene count">Scenes</button>
                        <button class="sort-rating sort-btn${requestedSortMode === 'rating' ? ' active' : ''}" title="Sort by rating">Rating</button>
                    </div>
                    <div class="popup-header-close-wrapper">
                        <button class="popup-close">×</button>
                    </div>
                </div>
            `;
            
            // Grid wrapper for 4-column layout
            html += `<div class="popup-grid">`;
            
            performers.forEach(performer => {
                const imageUrl = performer.image_path ? `${window.location.origin}/performer/${performer.id}/image?t=${Date.now()}` : '';
                const safeName = this.escapeHtml(performer.name);
                const ratingNum = this.getRating10(performer);
                const ratingText = (typeof ratingNum === 'number' && !isNaN(ratingNum)) ? ratingNum.toFixed(1) : '—';
                const scenesNum = this.getScenes(performer);
                const scenesValue = Number.isFinite(scenesNum) ? scenesNum : '—';
                
                html += `
                    <div class="performer-card" onclick="window.open('/performers/${performer.id}', '_blank')" data-scenes="${scenesValue}" data-rating="${typeof ratingNum === 'number' ? ratingNum.toFixed(1) : ''}" title="${safeName} — Scenes: ${scenesValue}, Rating: ${ratingText}">
                        ${imageUrl ? 
                            `<img src="${imageUrl}" class="performer-image" alt="${safeName}" data-fallback-avatar="true">` :
                            `<div class="performer-avatar-placeholder">👤</div>`
                        }
                        <div class="performer-name">${safeName}</div>
                        <div class="performer-scenes">Scenes: ${scenesValue}</div>
                        <div class="performer-rating">Rating: ${ratingText === '—' ? ratingText : `★ ${ratingText}`}</div>
                    </div>
                `;
            });
            
            html += '</div>';
            popup.innerHTML = html;
            
            // Attach image fallback handlers
            this.attachPopupImageFallbacks(popup);
            
            // Wire sort buttons - both are now functional
            const scenesBtn = popup.querySelector('.sort-scenes');
            const ratingBtn = popup.querySelector('.sort-rating');
            const closeBtn = popup.querySelector('.popup-close');
            
            if (scenesBtn) scenesBtn.addEventListener('click', (e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                e.stopImmediatePropagation();
                // console.log(`[Stats Enhancer] Switching to scenes sort for ${country}`);
                popup.dataset.sortMode = 'scenes'; 
                popup.dataset.sticky = 'true'; // Keep popup open
                this.showCountryPerformers(countryRow); 
            });
            if (ratingBtn) ratingBtn.addEventListener('click', (e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                e.stopImmediatePropagation();
                // console.log(`[Stats Enhancer] Switching to rating sort for ${country}`);
                popup.dataset.sortMode = 'rating'; 
                popup.dataset.sticky = 'true'; // Keep popup open
                this.showCountryPerformers(countryRow); 
            });
            if (closeBtn) closeBtn.addEventListener('click', (e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                e.stopImmediatePropagation();
                // console.log(`[Stats Enhancer] Closing popup for ${country}`);
                popup.style.display = 'none';
                popup.dataset.sticky = 'false';
            });
            
            // Reset sticky flag after successful content update
            popup.dataset.sticky = 'false';
            
        } catch (error) {
            console.error(`[Stats Enhancer] Error loading performers for ${country}:`, error);
            popup.innerHTML = '<div class="popup-error">Error loading performers</div>';
            // Reset sticky flag on error too
            popup.dataset.sticky = 'false';
        }
    }

    // Image fallback handler for popup images
    attachPopupImageFallbacks(popupEl) {
        try {
            const imgs = popupEl.querySelectorAll('img[data-fallback-avatar="true"]');
            imgs.forEach(img => {
                img.addEventListener('error', () => {
                    const fallback = document.createElement('div');
                    fallback.style.width = '100%';
                    fallback.style.aspectRatio = '3 / 4';
                    fallback.style.background = '#333';
                    fallback.style.color = '#888';
                    fallback.style.display = 'flex';
                    fallback.style.alignItems = 'center';
                    fallback.style.justifyContent = 'center';
                    fallback.style.fontSize = '20px';
                    fallback.style.borderRadius = '6px';
                    fallback.textContent = '👤';
                    img.replaceWith(fallback);
                }, { once: true });
            });
        } catch (e) {
            console.warn('[Stats Enhancer] Failed to attach image fallback handlers:', e);
        }
    }

    init() {
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.checkForStatsPage());
        } else {
            this.checkForStatsPage();
        }

        // Watch for navigation changes
        this.observePageChanges();
    }

    observePageChanges() {
        // Single URL-based observer to detect navigation
        let lastUrl = location.href;
        const urlCheckInterval = setInterval(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                this.checkForStatsPage();
            }
            // Also check on every interval if we're on stats page (in case we missed initial load)
            else if (url.includes('/stats')) {
                this.checkForStatsPage();
            }
        }, 500); // Check URL every 500ms
        
        // Store interval ID so we can clean it up if needed
        this.urlCheckInterval = urlCheckInterval;
    }

    checkForStatsPage() {
        // Prevent multiple simultaneous checks
        if (this.isCheckingStatsPage) return;
        
        // Check if we're on the stats page
        const onStatsPage = window.location.pathname.includes('/stats');
        
        // If we've left the stats page, reset the flag
        if (!onStatsPage && this.statsLoaded) {
            this.statsLoaded = false;
            return;
        }
        
        // Don't check if not on stats page or already loaded
        if (!onStatsPage) return;
        if (this.statsLoaded) return;
        
        // Check if we already have enhanced stats
        if (document.querySelector('#enhanced-stats-container')) {
            this.statsLoaded = true;
            return;
        }
        
        // Check if the basic stats are loaded (wait for them)
        const statsElement = document.querySelector('.stats');
        if (!statsElement) return; // Not ready yet
        
        // All conditions met - add enhanced stats
        this.isCheckingStatsPage = true;
        
        // Wait for page to settle before adding stats
        setTimeout(() => {
            // Double-check we still need to add stats (another check might have run)
            if (!document.querySelector('#enhanced-stats-container')) {
                console.log('[Stats Enhancer] Plugin loaded');
                this.addEnhancedStats();
                this.statsLoaded = true;
            }
            this.isCheckingStatsPage = false;
        }, 500);
    }

    async addEnhancedStats() {
        const statsContainer = document.querySelector('.stats').parentElement;
        if (!statsContainer) return;

        // Create container for enhanced stats
        const enhancedContainer = document.createElement('div');
        enhancedContainer.id = 'enhanced-stats-container';
        enhancedContainer.innerHTML = `
            <div class="col col-sm-8 m-sm-auto row stats-row">
                <div class="col-md-6 chart-column" id="country-stats-container">
                    <div class="stats-chart-title">
                        <span>Top Performers by Country</span>
                        <div class="gender-icon-filters">
                            <svg data-prefix="fas" data-icon="mars" class="svg-inline--fa fa-mars gender-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-gender="MALE" title="Male">
                                <path fill="currentColor" d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"></path>
                            </svg>
                            <svg data-prefix="fas" data-icon="venus" class="svg-inline--fa fa-venus gender-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-gender="FEMALE" title="Female">
                                <path fill="currentColor" d="M64 176a112 112 0 1 1 224 0A112 112 0 1 1 64 176zM208 349.1c81.9-15 144-86.8 144-173.1C352 78.8 273.2 0 176 0S0 78.8 0 176c0 86.3 62.1 158.1 144 173.1V384H112c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H208V349.1z"></path>
                            </svg>
                            <svg data-prefix="fas" data-icon="transgender" class="svg-inline--fa fa-transgender gender-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-gender="TRANS" title="Trans / Intersex / Non-Binary">
                                <path fill="currentColor" d="M112 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-31 31L112 78.1l7-7c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-7 7 15.2 15.2C187.7 107.6 220.5 96 256 96s68.3 11.6 94.9 31.2l68.8-68.8-31-31c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9h96c8.8 0 16 7.2 16 16v96c0 6.5-3.9 12.3-9.9 14.8s-12.9 1.1-17.4-3.5l-31-31-68.8 68.8C404.4 187.7 416 220.5 416 256c0 80.2-59 146.6-136 158.2V432h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v8c0 13.3-10.7 24-24 24s-24-10.7-24-24v-8H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h16V414.2C155 402.6 96 336.2 96 256c0-35.5 11.6-68.3 31.2-94.9L112 145.9l-7 7c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l7-7L58.3 92.3l-31 31c-4.6 4.6-11.5 5.9-17.4 3.5S0 118.5 0 112V16C0 7.2 7.2 0 16 0h96zM352 256a96 96 0 1 0 -192 0 96 96 0 1 0 192 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div id="country-chart" class="chart-container country-chart">
                        <div class="loading-spinner">Loading country data...</div>
                    </div>
                </div>
                <div class="col-md-6 chart-column" id="age-stats-container">
                    <div class="stats-chart-title">Age Distribution</div>
                    <div id="age-chart" class="chart-container age-chart">
                        <div class="loading-spinner">Loading age data...</div>
                    </div>
                </div>
            </div>
            <div class="col col-sm-8 m-sm-auto timeline-section">
                <div id="timeline-stats-container">
                    <div class="stats-chart-title">Scene Production Timeline (2000-Present)</div>
                    <div id="timeline-chart" class="chart-container">
                        <div class="loading-spinner">Loading scene timeline...</div>
                    </div>
                </div>
            </div>

        `;

        statsContainer.appendChild(enhancedContainer);

        // Load the data
        await this.loadCountryData();
        await this.loadAgeData();
        await this.loadTimelineData();

        // Add event listeners after all HTML is rendered
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add cache refresh functionality
        const refreshBtn = document.getElementById('refresh-cache-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                // Clear age distribution cache
                localStorage.removeItem('stash_age_distribution_cache');
                localStorage.removeItem('stash_age_distribution_cache_time');
                
                // Clear timeline cache
                localStorage.removeItem('stash_timeline_cache');
                localStorage.removeItem('stash_timeline_cache_time');
                
                // Clear all country performer caches
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith('country_performers_')) {
                        localStorage.removeItem(key);
                    }
                });
                
                document.getElementById('age-chart').innerHTML = '<div class="loading-spinner">Refreshing all cached data...</div>';
                document.getElementById('timeline-chart').innerHTML = '<div class="loading-spinner">Refreshing all cached data...</div>';
                this.loadAgeData();
                this.loadTimelineData();
            });

            // Add hover effect for refresh button
            refreshBtn.addEventListener('mouseenter', () => {
                refreshBtn.style.opacity = '0.8';
                refreshBtn.style.color = '#ffd700';
            });
            refreshBtn.addEventListener('mouseleave', () => {
                refreshBtn.style.opacity = '0.6';
                refreshBtn.style.color = '#888';
            });
        }
        
        // Get gender icons
        const genderIcons = document.querySelectorAll('.gender-icon');
        
        // Load saved gender filter preferences FIRST before adding listeners
        const savedGenderFilter = localStorage.getItem('stats_enhancer_gender_filter');
        if (savedGenderFilter) {
            try {
                const selectedGenders = JSON.parse(savedGenderFilter);
                
                // Determine which icons should be active based on saved preferences
                genderIcons.forEach(icon => {
                    const gender = icon.getAttribute('data-gender');
                    let shouldBeActive = false;
                    
                    if (gender === 'MALE' && selectedGenders.includes('MALE')) {
                        shouldBeActive = true;
                    } else if (gender === 'FEMALE' && selectedGenders.includes('FEMALE')) {
                        shouldBeActive = true;
                    } else if (gender === 'TRANS' && 
                        (selectedGenders.includes('TRANSGENDER_FEMALE') || 
                         selectedGenders.includes('TRANSGENDER_MALE') || 
                         selectedGenders.includes('INTERSEX') || 
                         selectedGenders.includes('NON_BINARY'))) {
                        shouldBeActive = true;
                    }
                    
                    if (shouldBeActive) {
                        icon.classList.add('active');
                    } else {
                        icon.classList.remove('active');
                    }
                });
            } catch (e) {
                console.warn('[Stats Enhancer] Failed to parse saved gender filter:', e);
            }
        } else {
            // Set default to Female only if no saved preference
            // console.log('[Stats Enhancer] No saved gender filter, using default: FEMALE');
            localStorage.setItem('stats_enhancer_gender_filter', JSON.stringify(['FEMALE']));
            
            // Also set the Female icon as active in the UI
            genderIcons.forEach(icon => {
                const gender = icon.getAttribute('data-gender');
                if (gender === 'FEMALE') {
                    icon.classList.add('active');
                } else {
                    icon.classList.remove('active');
                }
            });
        }
        
        // Add gender filter icon listeners AFTER loading preferences
        genderIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const gender = icon.getAttribute('data-gender');
                
                // Toggle active state
                icon.classList.toggle('active');
                
                // Build selected gender list
                const selectedGenders = [];
                document.querySelectorAll('.gender-icon.active').forEach(activeIcon => {
                    const activeGender = activeIcon.getAttribute('data-gender');
                    if (activeGender === 'MALE') {
                        selectedGenders.push('MALE');
                    } else if (activeGender === 'FEMALE') {
                        selectedGenders.push('FEMALE');
                    } else if (activeGender === 'TRANS') {
                        // Trans icon includes all trans/intersex/non-binary
                        selectedGenders.push('TRANSGENDER_FEMALE', 'TRANSGENDER_MALE', 'INTERSEX', 'NON_BINARY');
                    }
                });
                
                // Save filter preferences to localStorage
                localStorage.setItem('stats_enhancer_gender_filter', JSON.stringify(selectedGenders));
                
                // Reload country data with new filters
                this.loadCountryData();
            });
        });
    }

    async loadCountryData() {
        try {
            // Get selected genders from filter checkboxes
            let selectedGenders = ['FEMALE']; // Default to female only if nothing saved
            const savedGenderFilter = localStorage.getItem('stats_enhancer_gender_filter');
            if (savedGenderFilter) {
                try {
                    const parsed = JSON.parse(savedGenderFilter);
                    // Accept empty array - user deliberately deselected all
                    if (Array.isArray(parsed)) {
                        selectedGenders = parsed;
                    }
                } catch (e) {
                    console.warn('[Stats Enhancer] Failed to parse gender filter, using default:', e);
                }
            }
            
            // Don't load if no genders are selected
            if (selectedGenders.length === 0) {
                // console.log('[Stats Enhancer] No genders selected, skipping country data load');
                document.getElementById('country-chart').innerHTML = 
                    '<div class="loading-spinner">Select at least one gender to view data</div>';
                return;
            }
            
            // console.log(`[Stats Enhancer] Loading country data for genders: ${selectedGenders.join(', ')}`);
            
            // Get all performers using pagination to handle large datasets
            let allPerformers = [];
            let page = 1;
            const perPage = 1000;
            let hasMore = true;

            while (hasMore) {
                const query = `
                    query($page: Int!, $per_page: Int!) {
                        findPerformers(filter: { page: $page, per_page: $per_page }) {
                            count
                            performers {
                                id
                                name
                                country
                                gender
                                scene_count
                            }
                        }
                    }
                `;

                const response = await this.fetchGraphQL(query, { page, per_page: perPage });
                const data = response.data.findPerformers;
                
                allPerformers = allPerformers.concat(data.performers);
                hasMore = data.performers.length === perPage;
                page++;
                
                // Update loading indicator with gender info
                const genderText = selectedGenders.length === 1 ? selectedGenders[0] : `${selectedGenders.length} genders`;
                document.getElementById('country-chart').innerHTML = 
                    `<div class="loading-spinner">Loading performers (${genderText})... ${allPerformers.length.toLocaleString()}</div>`;
            }

            const performers = allPerformers;
            
            // Filter for selected genders (include all, even with 0 scenes for consistency)
            const filteredPerformers = performers.filter(p => 
                selectedGenders.includes(p.gender) && this.getScenes(p) >= 0
            );
            
            // console.log(`[Stats Enhancer] Filtered to ${filteredPerformers.length} performers from ${selectedGenders.join(', ')}`);
            
            // Count performers by country - NORMALIZE TO UPPERCASE for consistent grouping
            const countryCounts = {};
            let unknownCount = 0;
            
            filteredPerformers.forEach(performer => {
                if (performer.country && performer.country.trim()) {
                    // Normalize to uppercase to group case variations (NO, no, No -> NO)
                    const country = performer.country.trim().toUpperCase();
                    countryCounts[country] = (countryCounts[country] || 0) + 1;
                } else {
                    unknownCount++;
                }
            });

            // Sort all countries (not just top 10 for scrollable view)
            const sortedCountries = Object.entries(countryCounts)
                .sort(([,a], [,b]) => b - a);

            this.renderCountryChart(sortedCountries, unknownCount);
            
        } catch (error) {
            console.error('[Stats Enhancer] Error loading country data:', error);
            document.getElementById('country-chart').innerHTML = 
                '<div class="loading-spinner error">Error loading country data</div>';
        }
    }

    async loadAgeData() {
        try {
            // Check for cached age data first
            const cacheKey = 'stash_age_distribution_cache';
            const cacheTimeKey = 'stash_age_distribution_cache_time';
            
            const cachedData = localStorage.getItem(cacheKey);
            const cacheTime = localStorage.getItem(cacheTimeKey);
            
            // Check if we should refresh cache (weekly at 4am)
            const shouldRefreshCache = this.shouldRefreshWeeklyCache(cacheTime);
            
            // Use cached data if it exists and doesn't need weekly refresh
            if (cachedData && cacheTime && !shouldRefreshCache) {
                // console.log('[Stats Enhancer] Using cached age data');
                const { ageCounts, unknownAgeCount } = JSON.parse(cachedData);
                this.renderAgeChart(ageCounts, unknownAgeCount);
                return;
            }

            // Get all performers using pagination to handle large datasets
            let allPerformers = [];
            let page = 1;
            const perPage = 1000;
            let hasMore = true;

            while (hasMore) {
                const query = `
                    query($page: Int!, $per_page: Int!) {
                        findPerformers(filter: { page: $page, per_page: $per_page }) {
                            count
                            performers {
                                id
                                name
                                birthdate
                            }
                        }
                    }
                `;

                const response = await this.fetchGraphQL(query, { page, per_page: perPage });
                const data = response.data.findPerformers;
                
                allPerformers = allPerformers.concat(data.performers);
                hasMore = data.performers.length === perPage;
                page++;
                
                // Update loading indicator
                document.getElementById('age-chart').innerHTML = 
                    `<div class="loading-spinner">Loading performers... ${allPerformers.length.toLocaleString()}</div>`;
            }

            const performers = allPerformers;
            
            // Calculate ages at scene time instead of current age
            const ageCounts = {};
            let unknownAgeCount = 0;
            
            // Get scene ages for performers with birthdates
            const performersWithBirthdate = performers.filter(p => p.birthdate);
            
            // Update loading indicator
            document.getElementById('age-chart').innerHTML = 
                `<div class="loading-spinner">Calculating scene ages... 0 / ${performersWithBirthdate.length} (this may take a while...)</div>`;
            
            let processedCount = 0;
            
            // Process performers in batches to avoid overwhelming the API
            const batchSize = 50;
            for (let i = 0; i < performersWithBirthdate.length; i += batchSize) {
                const batch = performersWithBirthdate.slice(i, i + batchSize);
                
                await Promise.all(batch.map(async (performer) => {
                    try {
                        const sceneAges = await this.getPerformerSceneAges(performer);
                        sceneAges.forEach(age => {
                            if (age >= 18 && age <= 50) {
                                ageCounts[age] = (ageCounts[age] || 0) + 1;
                            }
                        });
                    } catch (error) {
                        console.warn(`Error getting scene ages for performer ${performer.name}:`, error);
                    }
                    
                    processedCount++;
                    if (processedCount % 10 === 0) {
                        document.getElementById('age-chart').innerHTML = 
                            `<div class="loading-spinner">Calculating scene ages... ${processedCount} / ${performersWithBirthdate.length} (caching for future loads...)</div>`;
                    }
                }));
            }
            
            unknownAgeCount = performers.length - performersWithBirthdate.length;

            // Cache the results for faster future loads
            const dataToCache = { ageCounts, unknownAgeCount };
            localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
            // console.log('[Stats Enhancer] Age data cached until next Sunday 4am');

            this.renderAgeChart(ageCounts, unknownAgeCount);
            
        } catch (error) {
            console.error('[Stats Enhancer] Error loading age data:', error);
            document.getElementById('age-chart').innerHTML = 
                '<div class="loading-spinner error">Error loading age data</div>';
        }
    }

    async loadTimelineData() {
        try {
            // Check for cached timeline data first
            const cacheKey = 'stash_timeline_cache';
            const cacheTimeKey = 'stash_timeline_cache_time';
            
            const cachedData = localStorage.getItem(cacheKey);
            const cacheTime = localStorage.getItem(cacheTimeKey);
            
            // Check if we should refresh cache (daily for current month, weekly for historical)
            const shouldRefreshCache = this.shouldRefreshTimelineCache(cacheTime);
            
            // Use cached data if it exists and doesn't need refresh
            if (cachedData && cacheTime && !shouldRefreshCache) {
                // console.log('[Stats Enhancer] Using cached timeline data');
                const monthlyCounts = JSON.parse(cachedData);
                this.renderTimelineChart(monthlyCounts);
                return;
            }

            // Get all scenes with dates from 2000 onwards using pagination
            let allScenes = [];
            let page = 1;
            const perPage = 1000;
            let hasMore = true;

            while (hasMore) {
                const query = `
                    query($page: Int!, $per_page: Int!) {
                        findScenes(
                            scene_filter: {
                                date: { modifier: GREATER_THAN, value: "2000-01-01" }
                            }
                            filter: { page: $page, per_page: $per_page }
                        ) {
                            count
                            scenes {
                                id
                                date
                            }
                        }
                    }
                `;

                const response = await this.fetchGraphQL(query, { page, per_page: perPage });
                const data = response.data.findScenes;
                
                allScenes = allScenes.concat(data.scenes);
                hasMore = data.scenes.length === perPage;
                page++;
                
                // Update loading indicator
                document.getElementById('timeline-chart').innerHTML = 
                    `<div class="loading-spinner">Loading scenes... ${allScenes.length.toLocaleString()}</div>`;
            }

            // Count scenes by month
            const monthlyCounts = {};
            
            allScenes.forEach(scene => {
                if (scene.date) {
                    // Extract year and month from date (YYYY-MM format)
                    const dateMatch = scene.date.match(/^(\d{4})-(\d{2})/);
                    if (dateMatch) {
                        const [, year, month] = dateMatch;
                        const yearNum = parseInt(year);
                        const monthNum = parseInt(month);
                        
                        // Only include 2000 onwards
                        if (yearNum >= 2000) {
                            const monthKey = `${year}-${month}`;
                            monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
                        }
                    }
                }
            });

            // Cache the results for faster future loads
            localStorage.setItem(cacheKey, JSON.stringify(monthlyCounts));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
            // console.log('[Stats Enhancer] Timeline data cached (daily refresh for current month, weekly for historical data)');

            this.renderTimelineChart(monthlyCounts);
            
        } catch (error) {
            console.error('[Stats Enhancer] Error loading timeline data:', error);
            document.getElementById('timeline-chart').innerHTML = 
                '<div class="loading-spinner error">Error loading timeline data</div>';
        }
    }

    renderTimelineChart(monthlyCounts) {
        const container = document.getElementById('timeline-chart');
        
        // Generate all months from Jan 2000 to current month
        const startYear = 2000;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // JS months are 0-based
        
        const months = [];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        for (let year = startYear; year <= currentYear; year++) {
            const endMonth = year === currentYear ? currentMonth : 12;
            for (let month = 1; month <= endMonth; month++) {
                const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
                const count = monthlyCounts[monthKey] || 0;
                months.push({
                    key: monthKey,
                    year,
                    month,
                    monthName: monthNames[month - 1],
                    count
                });
            }
        }
        
        // Reverse the months array so recent months are on the left
        months.reverse();
        
        // Find max count for scaling
        const maxCount = Math.max(...months.map(m => m.count));
        const maxHeight = 280; // Slightly reduced height - Maximum bar height in pixels
        
        let html = `<div class="timeline-container" id="timeline-bars-container">`;
        
        months.forEach((monthData, index) => {
            const { key, year, month, monthName, count } = monthData;
            const height = maxCount > 0 ? Math.max(1, (count / maxCount) * maxHeight) : 1;
            
            // Add gap between years (add margin-right after January in reversed timeline) - reduced gap
            const isJanuary = month === 1;
            const yearGap = isJanuary ? 'margin-right: 6px;' : '';
            
            // Color based on year progression (cooler to warmer over time)
            const yearProgress = (year - startYear) / (currentYear - startYear);
            const hue = Math.floor(240 - (yearProgress * 120)); // Blue to red
            const color = `hsl(${hue}, 70%, 60%)`;
            
            // Add year separator for January (since we reversed, January appears at different positions)
            let yearSeparator = '';
            if (month === 1) {
                yearSeparator = `<div class="year-separator year-separator-positioned">${year}</div>`;
            }
            
            html += `
                <div class="month-bar clickable-month-bar" 
                     data-month="${key}" 
                     data-count="${count}"
                     style="height: ${height}px; background: ${color}; ${yearGap}"
                     title="${monthName} ${year}: ${count} scenes - Click to view scenes from this month">
                    ${yearSeparator}
                    <div class="month-label">${monthName}</div>
                    <div class="month-count">${count}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add stats footer
        const totalScenes = months.reduce((sum, m) => sum + m.count, 0);
        const avgPerMonth = totalScenes > 0 ? (totalScenes / months.length).toFixed(1) : '0';
        const peakMonth = months.reduce((peak, m) => m.count > peak.count ? m : peak, months[0]);
        
        html += `
            <div class="chart-stats">
                <span>Total Scenes: ${totalScenes.toLocaleString()}</span>
                <span>Avg/Month: ${avgPerMonth}</span>
                <span>Peak: ${peakMonth.monthName} ${peakMonth.year} (${peakMonth.count})</span>
                <span>Scroll horizontally to navigate timeline</span>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add click handlers for month bars
        this.addTimelineClickHandlers();
        
        // Add horizontal mousewheel scrolling
        this.addTimelineMouseWheelScrolling();
        
        // Scroll to the left (recent months) by default
        setTimeout(() => {
            container.scrollLeft = 0;
        }, 100);
    }

    addTimelineClickHandlers() {
        document.querySelectorAll('.clickable-month-bar').forEach(bar => {
            bar.addEventListener('click', (e) => {
                const month = e.currentTarget.dataset.month;
                const count = parseInt(e.currentTarget.dataset.count);
                
                if (count === 0) {
                    // console.log(`[Stats Enhancer] No scenes for ${month}`);
                    return;
                }
                
                // Visual feedback for click
                e.currentTarget.style.transform = 'scaleY(1.3)';
                e.currentTarget.style.filter = 'brightness(1.5)';
                
                setTimeout(() => {
                    this.navigateToScenesForMonth(month);
                }, 200);
            });

            // Add hover effect
            bar.addEventListener('mouseenter', (e) => {
                if (!e.currentTarget.style.transform.includes('scaleY(1.3)')) {
                    e.currentTarget.style.transform = 'scaleY(1.1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,255,255,0.3)';
                }
            });

            bar.addEventListener('mouseleave', (e) => {
                if (!e.currentTarget.style.transform.includes('scaleY(1.3)')) {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }
            });
        });
    }

    addTimelineMouseWheelScrolling() {
        // Add scroll listener with delegation from document
        document.addEventListener('wheel', (e) => {
            // Check if the event target is within the timeline chart
            const timelineChart = e.target.closest('#timeline-chart');
            if (timelineChart) {
                e.preventDefault();
                
                // Find the actual scrollable container within the timeline chart
                const timelineContainer = timelineChart.querySelector('.timeline-container');
                if (timelineContainer) {
                    // Horizontal scroll: positive deltaY scrolls right, negative scrolls left
                    // Reduced multiplier for smoother scrolling
                    const scrollAmount = e.deltaY * 0.5;
                    timelineContainer.scrollLeft += scrollAmount;
                    
                } else {
                    // console.log('[Stats Enhancer] Timeline container not found inside timeline chart');
                }
            }
        }, { passive: false });
        
        // console.log('[Stats Enhancer] Timeline mousewheel scrolling enabled with document delegation');
    }

    navigateToScenesForMonth(monthKey) {
        // console.log(`[Stats Enhancer] ===== FILTERING BY MONTH ${monthKey} =====`);
        
        try {
            const [year, month] = monthKey.split('-');
            
            // Calculate start and end dates for the month
            const startDate = `${year}-${month}-01`;
            
            // Calculate last day of the month
            const monthInt = parseInt(month);
            const yearInt = parseInt(year);
            const lastDay = new Date(yearInt, monthInt, 0).getDate(); // 0 gets last day of previous month (which is current month)
            const endDate = `${year}-${month}-${lastDay.toString().padStart(2, '0')}`;
            
            // console.log(`[Stats Enhancer] Date range: ${startDate} to ${endDate}`);
            
            // Simplified filter - just date range
            const dateFilter = `("type":"date","modifier":"BETWEEN","value":("value":"${startDate}","value2":"${endDate}"))`;
            
            // console.log(`[Stats Enhancer] Using simplified date filter:`, {dateFilter});
            
            // Construct URL with simplified filter
            const searchParams = new URLSearchParams();
            searchParams.append('c', dateFilter);
            searchParams.set('sortby', 'date');
            searchParams.set('sortdir', 'asc');
            searchParams.set('z', '2');
            
            const filterUrl = `/scenes?${searchParams.toString()}`;
            
            // console.log(`[Stats Enhancer] ===== CONSTRUCTED URL: ${filterUrl} =====`);
            // console.log(`[Stats Enhancer] URL decoded: ${decodeURIComponent(filterUrl)}`);
            
            // Navigate to the filtered view
            // console.log(`[Stats Enhancer] ===== NAVIGATING TO MONTH FILTER =====`);
            window.location.href = filterUrl;
            
        } catch (error) {
            console.error('[Stats Enhancer] Error in month URL construction:', error);
            // console.log('[Stats Enhancer] Falling back to basic scenes page');
            window.location.href = '/scenes';
        }
    }

    renderCountryChart(sortedCountries, unknownCount) {
        const container = document.getElementById('country-chart');
        
        // Check if there are no results at all
        if ((!sortedCountries || sortedCountries.length === 0) && (!unknownCount || unknownCount === 0)) {
            container.innerHTML = '<div class="loading-spinner">No performers found for selected genders</div>';
            return;
        }
        
        // Build full rows list and compute max from all rows (including Unknown)
        const rows = unknownCount > 0 
            ? [...sortedCountries, ['Unknown', unknownCount]].sort((a, b) => b[1] - a[1])
            : [...sortedCountries];
        const maxCount = rows[0] ? rows[0][1] : 0;
        
        let html = '<div class="country-chart-scroll">';
        
        // Use logarithmic scaling for better visual distribution
        const logMax = Math.log(maxCount + 1);
        
        rows.forEach(([country, count], index) => {
            // Logarithmic scaling for better bar distribution
            const logCount = Math.log(count + 1);
            let percentage = logMax > 0 ? (logCount / logMax) * 100 : 0;
            // Make small countries still visible; minimum bar width
            percentage = Math.max(3, percentage);
            
            const countryInfo = this.getCountryInfo(country);
            
            // Create gradient from country colors
            let barGradient = 'linear-gradient(90deg, #4ecdc4, #44a08d)'; // default
            let flagCode = (country || '').substring(0, 2).toUpperCase(); // Default to first 2 chars
            let flagEmoji = '🏳️'; // Default flag
            let displayName = country;
            let demonym = null;
            
            if (country === 'Unknown') {
                displayName = 'Unknown';
                barGradient = 'linear-gradient(85deg, #1e88e5, #26a69a, #66bb6a)';
                flagEmoji = '🌍';
                flagCode = '??';
            } else {
                    if (countryInfo) {
                    flagCode = countryInfo.code;
                    flagEmoji = this.getFlagEmoji(countryInfo.code) || flagCode;
                    if (countryInfo.colors && countryInfo.colors.length >= 2) {
                        barGradient = `linear-gradient(85deg, ${countryInfo.colors.join(', ')})`;
                    }
                    // Prefer full name
                    displayName = Object.keys(this.countryCodes).find(name => this.countryCodes[name].code === flagCode) || country;
                        demonym = this.countryCodes[displayName] && this.countryCodes[displayName].demonym ? this.countryCodes[displayName].demonym : null;
                } else {
                    // If a code is given and we can reverse map it, use the full name
                    const fullFromCode = this.codeToName[flagCode];
                    if (fullFromCode) {
                        displayName = fullFromCode;
                        demonym = this.countryCodes[displayName] && this.countryCodes[displayName].demonym ? this.countryCodes[displayName].demonym : null;
                    }
                }
            }
            
            // Determine how many top performers to show on hover based on country total
            let performerLimit;
            if (count < 10) performerLimit = count; // Show all if less than 10
            else if (count > 1000) performerLimit = 100;
            else if (count > 200) performerLimit = 50;
            else if (count > 50) performerLimit = 20;
            else performerLimit = 10;
            
            html += `
                <div class="country-row" data-country="${country}" data-country-display="${this.escapeHtml(displayName)}" data-demonym="${demonym ? this.escapeHtml(demonym) : ''}" data-flag="${flagCode}" data-limit="${performerLimit}" data-total-count="${count}">
                    <div class="country-flag country-flag-dynamic" title="${this.escapeHtml(displayName)}" style="background: ${barGradient};">
                        ${flagEmoji}
                    </div>
                    <div class="country-bar-container country-bar-container-dynamic">
                        <div class="country-bar country-bar-dynamic" style="width: ${percentage}%; background: ${barGradient};">
                        </div>
                        <div class="country-label-overlay">
                            <span class="country-name country-name-dynamic">${this.escapeHtml(displayName)}</span>
                            <span class="country-count-label">${count.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="country-hover-popup" data-sticky="false" style="display: none; width: 84vw; overflow-y: hidden;">
                        <div class="popup-loading">Loading top performers...</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add stats footer
    const total = rows.filter(([c]) => c !== 'Unknown').reduce((sum, [,count]) => sum + count, 0);
        const showing = Math.min(10, rows.length);
        html += `
            <div class="chart-stats country-stats">
                <span>Total: ${total.toLocaleString()}</span>
                <span>Unknown: ${unknownCount.toLocaleString()}</span>
                <span>Countries: ${rows.length} (scroll for all)</span>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add hover events for country popups
        this.addCountryHoverEvents();
        
        // Animate bars
        setTimeout(() => {
            document.querySelectorAll('.country-bar').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width; // Trigger animation
                }, index * 50);
            });
        }, 100);
    }

    renderAgeChart(ageCounts, unknownAgeCount) {
        const container = document.getElementById('age-chart');
        const maxCount = Math.max(...Object.values(ageCounts));
        
        // Always include the refresh button in the rendered HTML
        let html = `
            <button id="refresh-cache-btn" class="refresh-btn" title="Refresh cached age data">
                ↻
            </button>
            <div class="age-bar-container">
        `;
        
        // Create bars for ages 18-50
        for (let age = 18; age <= 50; age++) {
            const count = ageCounts[age] || 0;
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            
            // Color gradient based on age (younger = warmer colors)
            const hue = Math.max(0, 240 - ((age - 18) * 6)); // Blue to red
            const color = `hsl(${hue}, 70%, 60%)`;
            
            html += `
                <div class="age-bar clickable-age-bar age-bar-dynamic" data-age="${age}" data-height="${percentage}%" style="background: ${color};" title="Age ${age}: ${count} scenes - Click to view scenes where performers were ${age} years old">
                    <div class="age-count">${count}</div>
                    <div class="age-label">${age}</div>
                </div>
            `;
        }
        
        html += '</div>';
        
        // Add stats footer
        const total = Object.values(ageCounts).reduce((sum, count) => sum + count, 0);
        const avgAge = total > 0 ? 
            Object.entries(ageCounts).reduce((sum, [age, count]) => sum + (parseInt(age) * count), 0) / total : 0;
        
        html += `
            <div class="chart-stats">
                <span>Total Scene Ages: ${total.toLocaleString()}</span>
                <span>Avg Scene Age: ${avgAge.toFixed(1)}</span>
                <span>No Birthdate: ${unknownAgeCount.toLocaleString()}</span>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add click handlers for age bars
        this.addAgeBarClickHandlers();
        
        // Animate bars
        setTimeout(() => {
            document.querySelectorAll('.age-bar').forEach((bar, index) => {
                const targetHeight = bar.getAttribute('data-height');
                if (targetHeight) {
                    setTimeout(() => {
                        bar.style.height = targetHeight;
                    }, index * 20);
                }
            });
        }, 100);
    }

    addAgeBarClickHandlers() {
        document.querySelectorAll('.clickable-age-bar').forEach(bar => {
            bar.addEventListener('click', (e) => {
                const age = parseInt(e.currentTarget.dataset.age);
                
                // Visual feedback for click
                e.currentTarget.style.transform = 'scaleY(1.3)';
                e.currentTarget.style.filter = 'brightness(1.5)';
                
                // Show loading state briefly
                const originalTitle = e.currentTarget.title;
                e.currentTarget.title = `Loading scenes where performers were ${age} years old...`;
                
                setTimeout(() => {
                    this.navigateToScenesWithPerformerAge(age);
                }, 200);
            });

            // Add hover effect
            bar.addEventListener('mouseenter', (e) => {
                if (!e.currentTarget.style.transform.includes('scaleY(1.3)')) {
                    e.currentTarget.style.transform = 'scaleY(1.1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255,255,255,0.3)';
                }
            });

            bar.addEventListener('mouseleave', (e) => {
                if (!e.currentTarget.style.transform.includes('scaleY(1.3)')) {
                    e.currentTarget.style.transform = 'scaleY(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }
            });
        });
    }

    navigateToScenesWithPerformerAge(age) {
        // console.log(`[Stats Enhancer] ===== FILTERING BY AGE ${age} =====`);
        
        try {
            // Use the simple format that we know works
            // Your working URL format: c=("type":"performer_age","modifier":"EQUALS","value":("value":50))
            const performerAgeFilter = `("type":"performer_age","modifier":"EQUALS","value":("value":${age}))`;
            
            // console.log(`[Stats Enhancer] Using working age filter:`, performerAgeFilter);
            
            // Construct URL exactly like your working example
            const searchParams = new URLSearchParams();
            searchParams.set('c', performerAgeFilter);
            searchParams.set('sortby', 'date');
            // searchParams.set('sortdir', 'asc');
            
            const filterUrl = `/scenes?${searchParams.toString()}`;
            
            // console.log(`[Stats Enhancer] ===== CONSTRUCTED URL: ${filterUrl} =====`);
            // console.log(`[Stats Enhancer] URL decoded: ${decodeURIComponent(filterUrl)}`);
            
            // Navigate directly to the working filter
            // console.log(`[Stats Enhancer] ===== NAVIGATING TO AGE FILTER =====`);
            window.location.href = filterUrl;
            
        } catch (error) {
            console.error('[Stats Enhancer] Error in URL construction:', error);
            // console.log('[Stats Enhancer] Falling back to basic scenes page');
            window.location.href = '/scenes';
        }
    }

    // GraphQL fetch utility
    async fetchGraphQL(query, variables = {}) {
        try {            
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.errors && result.errors.length > 0) {
                console.error('[Stats Enhancer] GraphQL errors:', result.errors);
                throw new Error(result.errors[0].message || 'GraphQL error');
            }

            return result;
        } catch (error) {
            console.error(`[Stats Enhancer] GraphQL request failed:`, error.message);
            throw error;
        }
    }
}

// Initialize when script loads
window.statsEnhancer = new StatsEnhancer();

// console.log('[Stats Enhancer] Plugin loaded successfully');