console.log('[Performer Rater] Plugin loading...');

class PerformerRater {
    constructor() {
        this.performers = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.ratingOverlay = null;
        this.selectedFakeTits = 'Natural'; // Default
        this.selectedSize = '34'; // Default
        this.selectedCup = 'C'; // Default
        this.currentTags = new Set(); // Current active tags
        
        // PRESET TAGS CONFIGURATION - Organized into 3 rows
        this.presetTagRows = [
            // Row 1: Status/Action tags
            ['Cataloged', 'Get More'],
            // Row 2: Platform tags  
            ['OnlyFans', 'Pornhub', 'RedGifs', 'JAV'],
            // Row 3: Physical/Type tags
            ['Big Natural Tits', 'Bimbo', 'Petite', 'Shemale', 'Slut', 'Whore']
        ];
        
        this.init();
    }

    init() {
        // Wait for page to load then add our button
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addRateButton());
        } else {
            this.addRateButton();
        }

        // Also watch for navigation changes
        this.observePageChanges();
    }

    observePageChanges() {
        const observer = new MutationObserver(() => {
            if ((window.location.pathname === '/performers' || window.location.pathname.startsWith('/performers?')) && !this.isActive) {
                setTimeout(() => this.addRateButton(), 500);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    addRateButton() {
        // Only add on main performers list page (not individual performer pages)
        if (window.location.pathname !== '/performers' && !window.location.pathname.startsWith('/performers?')) return;
        
        // Check if button already exists
        if (document.querySelector('#performer-rate-btn')) return;

        const toolbar = document.querySelector('.filtered-list-toolbar');
        if (!toolbar) return;

        // Create the RATE button
        const rateButton = document.createElement('button');
        rateButton.id = 'performer-rate-btn';
        rateButton.type = 'button';
        rateButton.className = 'btn btn-primary ml-2 mb-2';
        rateButton.textContent = 'RATE';
        rateButton.title = 'Quick rate performers (Arrow keys, Q to exit)';
        
        rateButton.addEventListener('click', () => this.startRating());

        // Add to toolbar at the end
        toolbar.appendChild(rateButton);
        
        console.log('[Performer Rater] Rate button added to toolbar');
    }

    startRating() {
        this.collectPerformers();
        if (this.performers.length === 0) {
            alert('No performers found on this page!');
            return;
        }

        this.currentIndex = 0;
        this.isActive = true;
        this.createRatingOverlay();
        this.showCurrentPerformer();
        this.setupKeyboardListeners();
        
        console.log(`[Performer Rater] Started rating with ${this.performers.length} performers`);
    }

    collectPerformers() {
        this.performers = [];
        
        // Look for performer cards
        const performerCards = document.querySelectorAll('.performer-card, .card');
        
        performerCards.forEach(card => {
            const link = card.querySelector('a[href*="/performers/"]');
            const img = card.querySelector('img');
            // Target the specific performer name span, fallback to other selectors if needed
            const nameElement = card.querySelector('.performer-name') || 
                               card.querySelector('.card-section-title') || 
                               card.querySelector('.performer-card-header') || 
                               card.querySelector('.text-truncate');
            
            if (link && img && nameElement) {
                const href = link.getAttribute('href');
                const performerId = href.split('/performers/')[1]?.split('?')[0];
                console.log('performerId: ', performerId);
                
                if (performerId) {
                    // Get the clean performer name directly from the span
                    let performerName = nameElement.textContent.trim().replace(/\s+/g, ' ') || 'Unknown';
                    console.log('performerName from .performer-name span: ', performerName);
                    
                    // Extract the gender SVG icon from the card
                    const genderSvg = card.querySelector('.gender-icon');
                    let genderIconHtml = '';
                    if (genderSvg) {
                        genderIconHtml = genderSvg.outerHTML;
                    }
                    
                    this.performers.push({
                        id: performerId,
                        name: performerName,
                        genderIcon: genderIconHtml,
                        imageUrl: img.src,
                        element: card,
                        customImageUrl: null // Will be loaded when needed
                    });
                }
            }
        });
        
        console.log(`[Performer Rater] Collected ${this.performers.length} performers`);
    }

    createRatingOverlay() {
        if (this.ratingOverlay) return;

        this.ratingOverlay = document.createElement('div');
        this.ratingOverlay.id = 'performer-rating-overlay';
        this.ratingOverlay.innerHTML = `
            <div class="rating-modal">
                <div class="rating-header">
                    <h3 id="performer-name">Loading...</h3>
                    <span class="help-text">navigate (←/→) rate (↑/↓) image lookup (-) model page (*)</span>
                    <div class="header-right">
                        <span id="performer-counter">0/0</span>
                        <button id="submit-rating" class="submit-btn">Submit</button>
                        <button class="close-btn" id="close-rating">&times;</button>
                    </div>
                </div>
                <div class="rating-content">
                    <div class="image-container">
                        <img id="performer-image" src="" alt="Performer" />
                    </div>
                    <div class="separator"></div>
                    <div class="controls-container">
                        <div class="three-column-layout">
                            <!-- Column 1: Rating and URL -->
                            <div class="column-1">
                                <div class="rating-section">
                                    <div class="rating-controls">
                                        <label for="rating-input">Rating:</label>
                                        <input type="text" id="rating-input" placeholder="6.9" maxlength="3" />
                                        <div class="rating-arrows">
                                            <button type="button" class="arrow-btn" id="rating-down">-</button>
                                            <button type="button" class="arrow-btn" id="rating-up">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="url-input-section" id="url-input-section">
                                    <label>Search:</label>
                                    <input type="text" id="image-url-input" placeholder="Image URL..." />
                                </div>
                            </div>
                            
                            <!-- Column 2: Fake Tits and Measurements -->
                            <div class="column-2">
                                <div class="fake-tits-section">
                                    <div class="fake-tits-controls">
                                        <label>Fake Tits:</label>
                                        <div class="button-group">
                                            <button type="button" class="toggle-btn" data-fake-tits="Natural">Natural</button>
                                            <button type="button" class="toggle-btn" data-fake-tits="Fake">Fake</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="measurements-section">
                                    <div class="measurements-controls">
                                        <label>Measurements:</label>
                                        <input type="text" id="measurements-input" placeholder="32C-24-34" />
                                    </div>
                                    <div class="measurements-buttons">
                                        <div class="size-buttons">
                                            ${['28','30','32','34','36','38','40'].map(size => 
                                                `<button type="button" class="size-btn" data-size="${size}">${size}</button>`
                                            ).join('')}
                                        </div>
                                        <div class="cup-buttons">
                                            ${['A','B','C','D','E','F','G','H'].map(cup => 
                                                `<button type="button" class="cup-btn" data-cup="${cup}">${cup}</button>`
                                            ).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Column 3: Tags -->
                            <div class="column-3">
                                <div class="tags-section">
                                    <div class="tags-input-controls">
                                        <label>Tags:</label>
                                        <input type="text" id="tags-input" placeholder="Add tags..." />
                                    </div>
                                    <div class="preset-tags" id="preset-tags">
                                        ${this.presetTagRows.map(row => 
                                            `<div class="preset-tag-row">
                                                ${row.map(tag => 
                                                    `<button type="button" class="preset-tag-btn" data-tag="${tag}">${tag}</button>`
                                                ).join('')}
                                            </div>`
                                        ).join('')}
                                    </div>
                                    <div class="active-tags" id="active-tags"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.ratingOverlay);

        // Add event listeners
        document.getElementById('close-rating').addEventListener('click', () => this.exitRating());
        document.getElementById('submit-rating').addEventListener('click', () => this.submitRating());
        
        // Rating arrows
        document.getElementById('rating-up').addEventListener('click', () => this.adjustRating(0.1));
        document.getElementById('rating-down').addEventListener('click', () => this.adjustRating(-0.1));
        
        // Image URL input - auto-update on paste/change and trigger search on Enter
        const imageUrlInput = document.getElementById('image-url-input');
        imageUrlInput.addEventListener('input', () => this.updateImageFromInput());
        imageUrlInput.addEventListener('paste', () => {
            setTimeout(() => this.updateImageFromInput(), 10);
        });
        imageUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const imageUrl = imageUrlInput.value.trim();
                if (imageUrl && this.performers[this.currentIndex]) {
                    // Save the image when Enter is pressed
                    this.savePerformerImage(this.performers[this.currentIndex].id, imageUrl);
                }
            }
        });
        
        // Fake tits buttons
        const fakeTitsButtons = document.querySelectorAll('[data-fake-tits]');
        fakeTitsButtons.forEach(btn => {
            btn.addEventListener('click', () => this.setFakeTits(btn.dataset.fakeTits));
        });
        
        // Tags functionality
        const tagsInput = document.getElementById('tags-input');
        tagsInput.addEventListener('keydown', (e) => this.handleTagsInput(e));
        
        // Preset tag buttons (now organized in rows)
        const presetTagButtons = document.querySelectorAll('.preset-tag-btn');
        presetTagButtons.forEach(btn => {
            btn.addEventListener('click', () => this.togglePresetTag(btn.dataset.tag, btn));
        });
        
        // Measurements buttons
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectSize(btn.dataset.size));
        });
        
        const cupButtons = document.querySelectorAll('.cup-btn');
        cupButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectCup(btn.dataset.cup));
        });
        
        // Measurements input manual override
        const measurementsInput = document.getElementById('measurements-input');
        measurementsInput.addEventListener('input', () => this.handleMeasurementsInput());
        
        // Handle paste events for URL input
        const urlInput = document.getElementById('image-url-input');
        urlInput.addEventListener('paste', (e) => {
            console.log('[Performer Rater] Paste event detected');
            
            // Small delay to let paste complete, then auto-update
            setTimeout(() => {
                const pastedValue = urlInput.value.trim();
                console.log(`[Performer Rater] Pasted value: "${pastedValue}"`);
                
                if (pastedValue) {
                    // Just update the image preview, don't hide the input
                    this.updateImageFromInput();
                    
                    // Return focus to rating input after a short delay
                    setTimeout(() => {
                        const ratingInput = document.getElementById('rating-input');
                        if (ratingInput) {
                            ratingInput.focus();
                        }
                    }, 500); // Increased delay to ensure image loading starts
                }
            }, 150); // Increased delay to ensure paste is fully processed
        });
        
        const ratingInput = document.getElementById('rating-input');
        ratingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.submitRating();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.adjustRating(0.1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.adjustRating(-0.1);
            }
        });
        
        // Handle automatic decimal insertion for ratings
        ratingInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9.]/g, ''); // Allow digits and decimal point
            
            // If it's just digits without decimal, auto-format
            if (!/\./.test(value) && value.length >= 2) {
                // Insert decimal after first digit (e.g., "84" becomes "8.4")
                value = value.charAt(0) + '.' + value.charAt(1);
                if (value.length > 3) {
                    value = value.substring(0, 3); // Limit to X.X format
                }
            }
            
            // Limit to 10.0 max
            const numValue = parseFloat(value);
            if (numValue > 10) {
                value = '10.0';
            }
            
            e.target.value = value;
        });
    }

    async showCurrentPerformer() {
        if (this.currentIndex >= this.performers.length) {
            this.exitRating();
            return;
        }

        const performer = this.performers[this.currentIndex];
        
        // Display performer name with gender icon
        const performerNameEl = document.getElementById('performer-name');
        if (performer.genderIcon) {
            performerNameEl.innerHTML = `${performer.genderIcon}<span style="margin-left: 8px;">${performer.name}</span>`;
        } else {
            performerNameEl.textContent = performer.name;
        }
        
        document.getElementById('performer-counter').textContent = 
            `${this.currentIndex + 1} / ${this.performers.length}`;
        
        // Always fetch the current performer data to get the most up-to-date image
        let imageUrl = performer.imageUrl; // Default fallback
        try {
            const currentPerformerData = await this.getPerformer(performer.id);
            console.log('currentPerformerData: ', currentPerformerData);
            if (currentPerformerData && currentPerformerData.image_path) {
                // Use the image_path from the database (this will be the updated image)
                imageUrl = `/performer/${performer.id}/image?t=${Date.now()}`;
            } else {
                // Fallback to checking details field for custom URLs
                const customImageUrl = this.extractCustomImageUrlFromDetails(currentPerformerData?.details);
                if (customImageUrl) {
                    imageUrl = customImageUrl;
                }
            }
        } catch (error) {
            console.error(`[Performer Rater] Error fetching current performer data:`, error);
        }
        
        const performerImageEl = document.getElementById('performer-image');
        
        // Clear any existing event handlers to prevent double-saving
        performerImageEl.onload = null;
        performerImageEl.onerror = null;
        
        if (imageUrl) {
            // Add aggressive cache-busting parameter to force fresh load
            const separator = imageUrl.includes('?') ? '&' : '?';
            const cacheBustedUrl = `${imageUrl}${separator}_cb=${Date.now()}&_r=${Math.random()}`;
            
            // Force cache refresh by setting src to empty first, then the cache-busted URL
            performerImageEl.src = '';
            performerImageEl.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg=='; // tiny blank SVG
            
            // Use setTimeout to ensure the blank takes effect and force reload
            setTimeout(() => {
                performerImageEl.src = cacheBustedUrl;
                console.log(`[Performer Rater] Loading image with cache-busting: ${cacheBustedUrl}`);
            }, 50);
        }
        
        document.getElementById('rating-input').value = '';
        
        // Clear image URL input
        const imageUrlInput = document.getElementById('image-url-input');
        if (imageUrlInput) {
            imageUrlInput.value = '';
        }
        
        // Clear tags checkbox reference (no longer exists)
        
        // Load performer data from API
        try {
            const performerData = await this.getPerformer(performer.id);
            console.log('performerData: ', performerData);
            this.loadPerformerData(performerData);
            
        } catch (error) {
            console.error('[Performer Rater] Error loading performer data:', error);
            // Set defaults if API fails
            this.setDefaults();
        }
        
        // Focus on rating input after a small delay to ensure DOM is ready
        setTimeout(() => {
            document.getElementById('rating-input').focus();
        }, 150);
        
        // Highlight current performer card
        this.highlightCurrentCard();
    }

    loadPerformerData(performerData) {
        // Clear tags from previous performer
        this.clearTags();
        
        // Load existing tags
        if (performerData.tags && performerData.tags.length > 0) {
            performerData.tags.forEach(tag => {
                this.addTag(tag.name);
                // Also activate preset button if it matches
                const presetBtn = document.querySelector(`[data-tag="${tag.name}"]`);
                if (presetBtn) {
                    presetBtn.classList.add('active');
                }
            });
        }
        
        // Load fake tits data
        const fakeTits = performerData.fake_tits;
        if (fakeTits === 'Fake') {
            this.setFakeTits('Fake');
        } else if (fakeTits === 'Natural') {
            this.setFakeTits('Natural');
        } else {
            // Default to natural if null
            this.setFakeTits('Natural');
        }
        
        // Load measurements data
        const measurements = performerData.measurements;
        console.log(`[Performer Rater] Loading measurements data: "${measurements}"`);
        
        if (measurements && measurements.trim()) {
            console.log(`[Performer Rater] Setting measurements input to: "${measurements}"`);
            document.getElementById('measurements-input').value = measurements;
            
            // Trigger input handler to parse and set up buttons
            setTimeout(() => {
                this.handleMeasurementsInput();
            }, 100);
        } else {
            console.log(`[Performer Rater] No measurements found, setting defaults`);
            // Set default 34C
            this.selectedSize = '34';
            this.selectedCup = 'C';
            
            setTimeout(() => {
                this.enableMeasurementButtons();
                this.updateSizeButtons();
                this.updateCupButtons();
                this.updateMeasurementsFromButtons();
            }, 100);
        }
        
        // Load rating data
        const rating = performerData.rating100 || performerData.rating;
        if (rating !== null && rating !== undefined) {
            // Convert from 100-scale to 10-scale and format
            const ratingValue = (rating / 10).toFixed(1);
            document.getElementById('rating-input').value = ratingValue;
        } else {
            // Clear rating input if no rating
            document.getElementById('rating-input').value = '';
        }
    }

    setDefaults() {
        console.log(`[Performer Rater] setDefaults called`);
        // Default to natural
        this.setFakeTits('Natural');
        
        // Default measurements 34C
        this.selectedSize = '34';
        this.selectedCup = 'C';
        
        setTimeout(() => {
            this.enableMeasurementButtons();
            this.updateSizeButtons();
            this.updateCupButtons();
            this.updateMeasurementsFromButtons();
        }, 100);
    }

    highlightCurrentCard() {
        // Remove previous highlights
        document.querySelectorAll('.rating-current').forEach(el => {
            el.classList.remove('rating-current');
        });
        
        // Highlight current
        if (this.performers[this.currentIndex]) {
            this.performers[this.currentIndex].element.classList.add('rating-current');
        }
    }

    async submitRating() {
        const ratingInput = document.getElementById('rating-input');
        let ratingValue = ratingInput.value.trim();
        
        // Handle single digit entries (e.g., "8" becomes "8.0")
        if (ratingValue.length === 1 && !isNaN(ratingValue)) {
            ratingValue = ratingValue + '.0';
        }
        
        const rating = parseFloat(ratingValue);
        
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert('Please enter a valid rating between 0.0 and 10.0');
            return;
        }

        const performer = this.performers[this.currentIndex];
        
        try {
            await this.updatePerformerRating(performer.id, rating);
            console.log(`[Performer Rater] Rated ${performer.name}: ${rating}`);
            
            // Save all current tags
            if (this.currentTags.size > 0) {
                await this.savePerformerTags(performer.id);
                console.log(`[Performer Rater] Saved tags for ${performer.name}: ${[...this.currentTags].join(', ')}`);
            }
            
            // Update fake tits and measurements
            await this.updatePerformerDetails(performer.id);
            
            this.nextPerformer();
        } catch (error) {
            console.error('[Performer Rater] Error updating performer:', error);
            alert('Error updating performer. Check console for details.');
        }
    }

    async updatePerformerRating(performerId, rating) {
        const mutation = `
            mutation PerformerUpdate($input: PerformerUpdateInput!) {
                performerUpdate(input: $input) {
                    id
                    rating100
                }
            }
        `;

        const variables = {
            input: {
                id: performerId,
                rating100: Math.round(rating * 10) // Convert to 0-100 scale
            }
        };

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: variables
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data;
    }

    async updatePerformerDetails(performerId) {
        const measurementsInput = document.getElementById('measurements-input');
        const measurements = measurementsInput.value.trim();
        
        const mutation = `
            mutation PerformerUpdate($input: PerformerUpdateInput!) {
                performerUpdate(input: $input) {
                    id
                    fake_tits
                    measurements
                }
            }
        `;

        const variables = {
            input: {
                id: performerId,
                fake_tits: this.selectedFakeTits,
                measurements: measurements || null
            }
        };

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: variables
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        console.log(`[Performer Rater] Updated details for performer ${performerId}: fake_tits=${this.selectedFakeTits}, measurements=${measurements}`);
        return result.data;
    }

    async savePerformerTags(performerId) {
        // Get all tag IDs for current tags
        const tagIds = [];
        
        for (const tagName of this.currentTags) {
            const tagId = await this.findOrCreateTag(tagName);
            tagIds.push(tagId);
        }

        // Update performer with all tags
        const mutation = `
            mutation PerformerUpdate($input: PerformerUpdateInput!) {
                performerUpdate(input: $input) {
                    id
                    tags {
                        id
                        name
                    }
                }
            }
        `;

        const variables = {
            input: {
                id: performerId,
                tag_ids: tagIds
            }
        };

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: mutation,
                variables: variables
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data;
    }

    async findOrCreateTag(tagName) {
        // First try to find existing tag
        const findQuery = `
            query FindTag($name: String!) {
                findTags(tag_filter: { name: { value: $name, modifier: EQUALS } }) {
                    tags {
                        id
                        name
                    }
                }
            }
        `;

        let response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: findQuery,
                variables: { name: tagName }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        // If tag exists, return its ID
        if (result.data.findTags.tags.length > 0) {
            return result.data.findTags.tags[0].id;
        }

        // Create new tag if it doesn't exist
        const createMutation = `
            mutation TagCreate($input: TagCreateInput!) {
                tagCreate(input: $input) {
                    id
                    name
                }
            }
        `;

        response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: createMutation,
                variables: {
                    input: { name: tagName }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data.tagCreate.id;
    }

    async getPerformer(performerId) {
        const query = `
            query FindPerformer($id: ID!) {
                findPerformer(id: $id) {
                    id
                    name
                    details
                    image_path
                    fake_tits
                    measurements
                    rating100
                    tags {
                        id
                        name
                    }
                }
            }
        `;

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: { id: performerId }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data.findPerformer;
    }

    extractCustomImageUrlFromDetails(details) {
        if (!details) return null;
        
        // First try old format with "Custom Image URL:" prefix
        const oldFormatMatch = details.match(/Custom Image URL:\s*(.+?)(?:\n|$)/);
        if (oldFormatMatch) {
            return oldFormatMatch[1].trim();
        }
        
        // Try to find a URL in the details (look for http/https URLs)
        const lines = details.split('\n');
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.match(/^https?:\/\/.+/)) {
                return trimmedLine;
            }
        }
        
        return null;
    }

    async loadCustomImageUrl(performerIndex) {
        try {
            const performer = this.performers[performerIndex];
            if (!performer || performer.customImageUrl !== null) return; // Already loaded or no performer
            
            const performerData = await this.getPerformer(performer.id);
            console.log('performerData: ', performerData);
            const customImageUrl = this.extractCustomImageUrlFromDetails(performerData.details);
            
            this.performers[performerIndex].customImageUrl = customImageUrl || false; // false means no custom URL
            console.log(`[Performer Rater] Loaded custom image URL for performer ${performer.id}: ${customImageUrl || 'none'}`);
        } catch (error) {
            console.error(`[Performer Rater] Error loading custom image URL:`, error);
            this.performers[performerIndex].customImageUrl = false;
        }
    }

    refreshCurrentPerformerImage() {
        // Force refresh by reloading the current performer from the database
        if (this.performers[this.currentIndex]) {
            // Clear the cached custom image URL to force reload from database
            this.performers[this.currentIndex].customImageUrl = null;
            // Reload and display
            this.showCurrentPerformer();
        }
    }

    skipPerformer() {
        // If there's a custom image, we can skip rating but still save the image
        const performer = this.performers[this.currentIndex];
        if (performer && performer.customImageUrl) {
            console.log(`[Performer Rater] Skipped rating but image was already saved for ${performer.name}`);
        }
        this.nextPerformer();
    }

    adjustRating(delta) {
        const ratingInput = document.getElementById('rating-input');
        let currentValue = ratingInput.value.trim();
        
        // If empty, start with base value
        if (!currentValue) {
            currentValue = delta > 0 ? '0.1' : '0.0';
        } else {
            // Handle single digit entries (e.g., "8" becomes "8.0")
            if (currentValue.length === 1 && !isNaN(currentValue)) {
                currentValue = currentValue + '.0';
            }
            
            let rating = parseFloat(currentValue);
            if (isNaN(rating)) {
                rating = 0;
            }
            
            // Adjust by delta
            rating += delta;
            
            // Clamp between 0.0 and 10.0
            rating = Math.max(0, Math.min(10, rating));
            
            // Format to one decimal place
            currentValue = rating.toFixed(1);
        }
        
        ratingInput.value = currentValue;
    }

    nextPerformer() {
        this.currentIndex++;
        this.showCurrentPerformer();
    }

    previousPerformer() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showCurrentPerformer();
        }
    }

    setupKeyboardListeners() {
        // Comprehensive key interception to prevent underlying page navigation while overlay is active
        const blockedKeys = new Set(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']);
        const shortcutKeys = new Set(['+','-','_','*','I','i','Enter','Escape']);

        // Capture-phase interceptor stops events before page scripts (including those in capture phase) can see them
        this.globalKeyInterceptor = (e) => {
            if (!this.isActive) return; // Nothing if overlay not active

            const key = e.key;
            const shouldBlock = blockedKeys.has(key) || shortcutKeys.has(key);
            if (!shouldBlock) return;

            // Always block native action + upstream listeners
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            // Only perform logic on keydown (ignore keyup/keypress beyond blocking propagation)
            if (e.type !== 'keydown') return;

            const activeElement = document.activeElement;
            const ratingInput = document.getElementById('rating-input');
            const isRatingInputFocused = activeElement === ratingInput;
            const isTypingInOtherInputs = activeElement && (
                (activeElement.tagName === 'INPUT' && activeElement.type === 'text' && activeElement !== ratingInput) ||
                activeElement.tagName === 'TEXTAREA'
            );

            switch (key) {
                case 'ArrowRight':
                    if (!isTypingInOtherInputs) this.nextPerformer();
                    break;
                case 'ArrowLeft':
                    if (!isTypingInOtherInputs) this.previousPerformer();
                    break;
                case 'ArrowUp':
                    if (isRatingInputFocused) this.adjustRating(0.1); // already prevented default
                    break;
                case 'ArrowDown':
                    if (isRatingInputFocused) this.adjustRating(-0.1);
                    break;
                case '+':
                    if (!isTypingInOtherInputs) this.toggleGetMore();
                    break;
                case '-':
                case '_':
                case 'I':
                case 'i':
                    if (!isTypingInOtherInputs) this.triggerImageSearch();
                    break;
                case '*':
                    if (!isTypingInOtherInputs) this.openPerformerPage();
                    break;
                case 'Enter':
                    // Allow Enter to submit if not in other inputs (rating input ok)
                    if (!isTypingInOtherInputs) this.submitRating();
                    break;
                case 'Escape':
                    this.exitRating();
                    break;
            }
        };

        // Attach in capture phase so nothing else (even capture listeners) get arrow keys while active
        window.addEventListener('keydown', this.globalKeyInterceptor, true);
        window.addEventListener('keyup', this.globalKeyInterceptor, true);
        window.addEventListener('keypress', this.globalKeyInterceptor, true);

        // Optional: focus trap so clicks on overlay don't shift focus to underlying page
        if (!this.focusTrapHandler) {
            this.focusTrapHandler = (e) => {
                if (!this.isActive) return;
                const modal = document.querySelector('#performer-rating-overlay .rating-modal');
                if (modal && !modal.contains(e.target)) {
                    // Clicked outside modal (on overlay); keep focus inside
                    const ratingInputEl = document.getElementById('rating-input');
                    if (ratingInputEl) ratingInputEl.focus();
                    e.stopPropagation();
                }
            };
            document.addEventListener('mousedown', this.focusTrapHandler, true);
        }
    }

    toggleGetMore() {
        // Toggle the "Get More" tag
        const getMoreBtn = document.querySelector('[data-tag="Get More"]');
        if (getMoreBtn) {
            this.togglePresetTag('Get More', getMoreBtn);
        }
    }

    toggleImageLookup() {
        const urlSection = document.getElementById('url-input-section');
        if (urlSection && urlSection.style.display === 'none') {
            this.showUrlInput();
        } else {
            this.hideUrlInput();
        }
    }

    showUrlInput() {
        const urlSection = document.getElementById('url-input-section');
        const urlInput = document.getElementById('image-url-input');
        
        if (urlSection) {
            urlSection.style.display = 'block';
        }
        if (urlInput) {
            urlInput.focus();
        }
        
        // Open Google Images search for current performer
        this.openGoogleImages();
    }

    hideUrlInput() {
        const urlSection = document.getElementById('url-input-section');
        const urlInput = document.getElementById('image-url-input');
        
        if (urlSection) {
            urlSection.style.display = 'none';
        }
        if (urlInput) {
            urlInput.value = '';
        }
        
        // Return focus to rating input
        const ratingInput = document.getElementById('rating-input');
        if (ratingInput) {
            ratingInput.focus();
        }
    }

    openGoogleImages() {
        if (this.performers[this.currentIndex]) {
            const performerName = this.performers[this.currentIndex].name;
            const searchTerm = `nude ${performerName}`;
            const searchQuery = encodeURIComponent(searchTerm);
            
            console.log(`[Performer Rater] Search query: ${searchTerm}`);
            
            // Use imgar=t for tall/portrait images
            const googleImagesUrl = `https://www.google.com/search?q=${searchQuery}&tbm=isch&tbs=isz:l,itp:photo&imgar=t`;
            window.open(googleImagesUrl, '_blank');
        }
    }

    adjustRating(delta) {
        const ratingInput = document.getElementById('rating-input');
        const currentValue = parseFloat(ratingInput.value) || 0;
        const newValue = Math.max(0, Math.min(10, currentValue + delta));
        ratingInput.value = newValue.toFixed(1);
    }

    setFakeTits(value) {
        const buttons = document.querySelectorAll('[data-fake-tits]');
        
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Set active based on value
        const activeButton = document.querySelector(`[data-fake-tits="${value}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        this.selectedFakeTits = value;
    }

    selectSize(size) {
        this.selectedSize = size;
        this.updateSizeButtons();
        this.updateMeasurementsFromButtons();
    }

    selectCup(cup) {
        this.selectedCup = cup;
        this.updateCupButtons();
        this.updateMeasurementsFromButtons();
    }

    updateSizeButtons() {
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.size === this.selectedSize) {
                btn.classList.add('active');
            }
        });
    }

    updateCupButtons() {
        const cupButtons = document.querySelectorAll('.cup-btn');
        cupButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.cup === this.selectedCup) {
                btn.classList.add('active');
            }
        });
    }

    updateMeasurementsFromButtons() {
        if (this.selectedSize && this.selectedCup) {
            const measurementsInput = document.getElementById('measurements-input');
            const currentValue = measurementsInput.value.trim();
            
            console.log(`[Performer Rater] updateMeasurementsFromButtons: currentValue="${currentValue}", selectedSize="${this.selectedSize}", selectedCup="${this.selectedCup}"`);
            
            // Set flag to prevent input handler from interfering
            this.updatingFromButtons = true;
            
            let newValue;
            
            // If there's an existing measurement in the full format, preserve the waist and hips
            // Handle formats like "32C-24-34", "34DD-26-36", etc.
            const fullMatch = currentValue.match(/^(\d{2})([A-H]+)(-\d{2}-\d{2})$/);
            if (fullMatch) {
                const [, , , waistHips] = fullMatch;
                newValue = this.selectedSize + this.selectedCup + waistHips;
                console.log(`[Performer Rater] Full match found, preserving waist-hips: "${waistHips}"`);
            } else {
                // Check if we have any waist-hips portion to preserve (e.g., "32C-24-34" -> "-24-34")
                const partialMatch = currentValue.match(/^(\d{2})([A-H]+)(-\d{2}-\d{2}.*)$/);
                if (partialMatch) {
                    const [, , , waistHips] = partialMatch;
                    newValue = this.selectedSize + this.selectedCup + waistHips;
                    console.log(`[Performer Rater] Partial match found, preserving waist-hips: "${waistHips}"`);
                } else {
                    // Look for any trailing waist-hips pattern even if bust doesn't match button format
                    const waistHipsMatch = currentValue.match(/(-\d{2}-\d{2}.*)$/);
                    if (waistHipsMatch) {
                        newValue = this.selectedSize + this.selectedCup + waistHipsMatch[1];
                        console.log(`[Performer Rater] Waist-hips pattern found, preserving: "${waistHipsMatch[1]}"`);
                    } else {
                        // Simple format or new measurement
                        newValue = this.selectedSize + this.selectedCup;
                        console.log(`[Performer Rater] No waist-hips found, using simple format`);
                    }
                }
            }
            
            console.log(`[Performer Rater] Setting new value: "${newValue}"`);
            measurementsInput.value = newValue;
            
            // Clear flag after a longer delay to ensure event processing is complete
            setTimeout(() => {
                this.updatingFromButtons = false;
            }, 100);
            
            this.enableMeasurementButtons();
        }
    }

    handleMeasurementsInput() {
        // Don't interfere if we're updating from buttons
        if (this.updatingFromButtons) {
            console.log(`[Performer Rater] handleMeasurementsInput blocked - updatingFromButtons=true`);
            return;
        }
        
        const measurementsInput = document.getElementById('measurements-input');
        const value = measurementsInput.value.trim();
        
        console.log(`[Performer Rater] handleMeasurementsInput called with value: "${value}"`);
        
        if (!value) {
            // Empty input, re-enable buttons and set default
            this.selectedSize = '34';
            this.selectedCup = 'C';
            this.updateMeasurementsFromButtons();
            return;
        }
        
        // Try to parse the value to see if it matches our button format
        const bustMatch = value.match(/^(\d{2})([A-H]+)/);
        if (bustMatch) {
            // Value matches button format - enable buttons and set selections
            const [, size, cup] = bustMatch;
            console.log(`[Performer Rater] Input parsed - size: "${size}", cup: "${cup}"`);
            this.selectedSize = size;
            this.selectedCup = cup;
            
            // Enable buttons and update their states
            this.enableMeasurementButtons();
            this.updateSizeButtons();
            this.updateCupButtons();
        } else {
            // Value doesn't match button format - disable buttons
            console.log(`[Performer Rater] Input doesn't match button format, disabling buttons`);
            this.disableMeasurementButtons();
            this.selectedSize = null;
            this.selectedCup = null;
        }
    }

    enableMeasurementButtons() {
        const sizeButtons = document.querySelectorAll('.size-btn');
        const cupButtons = document.querySelectorAll('.cup-btn');
        
        sizeButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
        
        cupButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
        
        this.updateSizeButtons();
        this.updateCupButtons();
    }

    disableMeasurementButtons() {
        const sizeButtons = document.querySelectorAll('.size-btn');
        const cupButtons = document.querySelectorAll('.cup-btn');
        
        sizeButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active');
            btn.classList.add('disabled');
        });
        
        cupButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active');
            btn.classList.add('disabled');
        });
    }

    // Tags functionality methods
    handleTagsInput(event) {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault();
            const tagValue = event.target.value.trim();
            if (tagValue) {
                this.addTag(tagValue);
                event.target.value = '';
            }
        }
    }

    togglePresetTag(tagName, buttonElement) {
        if (this.currentTags.has(tagName)) {
            this.removeTag(tagName);
            buttonElement.classList.remove('active');
        } else {
            this.addTag(tagName);
            buttonElement.classList.add('active');
        }
    }

    addTag(tagName) {
        if (!this.currentTags.has(tagName)) {
            this.currentTags.add(tagName);
            this.renderActiveTags();
        }
    }

    removeTag(tagName) {
        this.currentTags.delete(tagName);
        this.renderActiveTags();
        
        // Also update preset button state
        const presetBtn = document.querySelector(`[data-tag="${tagName}"]`);
        if (presetBtn) {
            presetBtn.classList.remove('active');
        }
    }

    renderActiveTags() {
        const activeTagsContainer = document.getElementById('active-tags');
        if (!activeTagsContainer) return;

        activeTagsContainer.innerHTML = '';
        
        this.currentTags.forEach(tagName => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item';
            tagElement.innerHTML = `
                <span>${tagName}</span>
                <span class="tag-remove" onclick="window.performerRater.removeTag('${tagName}')" title="Remove tag">×</span>
            `;
            activeTagsContainer.appendChild(tagElement);
        });
    }

    clearTags() {
        this.currentTags.clear();
        this.renderActiveTags();
        
        // Clear all preset button states
        document.querySelectorAll('.preset-tag-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    openPerformerPage() {
        if (this.performers[this.currentIndex]) {
            const performerId = this.performers[this.currentIndex].id;
            const performerUrl = `/performers/${performerId}`;
            window.open(performerUrl, '_blank');
            console.log(`[Performer Rater] Opened performer page for ${this.performers[this.currentIndex].name}`);
        }
    }

    updateImage() {
        const urlInput = document.getElementById('image-url-input');
        const imageUrl = urlInput.value.trim();
        
        if (!imageUrl) {
            alert('Please enter an image URL');
            return;
        }
        
        // Validate URL format
        try {
            new URL(imageUrl);
        } catch (e) {
            alert('Please enter a valid URL');
            return;
        }
        
        // Update the image source with error handling
        const performerImage = document.getElementById('performer-image');
        
        performerImage.onerror = () => {
            console.error(`[Performer Rater] Failed to load image: ${imageUrl}`);
            alert('Failed to load image. Please check the URL and try again.');
            // Restore original image if custom fails
            if (this.performers[this.currentIndex] && this.performers[this.currentIndex].imageUrl) {
                performerImage.src = this.performers[this.currentIndex].imageUrl;
            }
        };
        
        performerImage.onload = () => {
            console.log(`[Performer Rater] Successfully loaded and saved image: ${imageUrl}`);
            // Store the new URL and save only after successful load
            if (this.performers[this.currentIndex]) {
                this.performers[this.currentIndex].customImageUrl = imageUrl;
                // Save the image as performer's cover image
                this.savePerformerImage(this.performers[this.currentIndex].id, imageUrl);
            }
        };
        
        // Set the source to trigger loading
        performerImage.src = imageUrl;
        
        // Don't automatically hide the URL input - user can manually close if needed
        console.log(`[Performer Rater] Attempting to load image: ${imageUrl}`);
    }

    updateImageFromInput() {
        const urlInput = document.getElementById('image-url-input');
        const imageUrl = urlInput.value.trim();
        
        if (imageUrl) {
            try {
                new URL(imageUrl);
                const performerImage = document.getElementById('performer-image');
                
                // Clear any existing handlers to prevent conflicts
                performerImage.onload = null;
                performerImage.onerror = null;
                
                // Create a new image element to test loading without interfering with display
                const testImage = new Image();
                
                testImage.onerror = () => {
                    console.log(`[Performer Rater] Failed to load image: ${imageUrl}`);
                    // Try to reload the original image if custom fails
                    if (this.performers[this.currentIndex] && this.performers[this.currentIndex].imageUrl) {
                        performerImage.src = this.performers[this.currentIndex].imageUrl;
                    }
                };
                
                testImage.onload = () => {
                    console.log(`[Performer Rater] Successfully loaded image: ${imageUrl}`);
                    // Store for potential saving only after successful load
                    if (this.performers[this.currentIndex] && !this.performers[this.currentIndex].savingImage) {
                        const currentPerformerId = this.performers[this.currentIndex].id;
                        const currentPerformerName = this.performers[this.currentIndex].name;
                        console.log(`[Performer Rater] Auto-saving image for performer ${currentPerformerId} (${currentPerformerName}) at index ${this.currentIndex}`);
                        
                        // Prevent multiple saves
                        this.performers[this.currentIndex].savingImage = true;
                        this.performers[this.currentIndex].customImageUrl = imageUrl;
                        
                        // Update the display image and save
                        performerImage.src = imageUrl;
                        this.savePerformerImage(currentPerformerId, imageUrl).finally(() => {
                            if (this.performers[this.currentIndex]) {
                                this.performers[this.currentIndex].savingImage = false;
                            }
                        });
                    }
                };
                
                // Test load the image
                testImage.src = imageUrl;
                
            } catch (e) {
                console.log(`[Performer Rater] Invalid URL format: ${imageUrl}`);
                // Invalid URL, just ignore
            }
        }
    }

    triggerImageSearch() {
        // Trigger the image lookup functionality (same as pressing 'I' key)
        this.openGoogleImages();
        
        // Make sure URL input is visible and focused
        const urlSection = document.getElementById('url-input-section');
        if (urlSection) {
            urlSection.style.display = 'block';
        }
        
        // Focus the image URL input for easy pasting
        const imageUrlInput = document.getElementById('image-url-input');
        if (imageUrlInput) {
            imageUrlInput.focus();
        }
    }

    async uploadImageToStash(imageUrl) {
        try {
            console.log(`[Performer Rater] Uploading image from URL: ${imageUrl}`);
            
            // Use Stash's built-in URL import functionality via GraphQL
            // This bypasses CSP issues by letting Stash's backend download the image
            const mutation = `
                mutation {
                    downloadPerformerImage(url: "${imageUrl}") {
                        id
                        path
                    }
                }
            `;

            console.log(`[Performer Rater] Attempting to use Stash's downloadPerformerImage...`);
            let response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: mutation
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (!result.errors && result.data?.downloadPerformerImage) {
                    console.log(`[Performer Rater] Stash downloadPerformerImage successful:`, result.data);
                    return result.data.downloadPerformerImage.id;
                }
            }

            console.log(`[Performer Rater] downloadPerformerImage not available, trying alternative approach...`);
            
            // Alternative: Use a canvas-based approach to convert the image
            return await this.uploadImageViaCanvas(imageUrl);
            
        } catch (error) {
            console.error('[Performer Rater] Error uploading image:', error);
            return null;
        }
    }

    async uploadImageViaCanvas(imageUrl) {
        try {
            console.log(`[Performer Rater] Trying canvas-based approach for: ${imageUrl}`);
            
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous'; // Try to enable CORS
                
                img.onload = async () => {
                    try {
                        // Create a canvas to convert the image to blob
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        
                        // Draw the image on canvas
                        ctx.drawImage(img, 0, 0);
                        
                        // Convert canvas to blob
                        canvas.toBlob(async (blob) => {
                            try {
                                if (!blob) {
                                    throw new Error('Failed to create blob from canvas');
                                }
                                
                                console.log(`[Performer Rater] Created blob from canvas, size: ${blob.size} bytes`);
                                
                                // Create FormData for upload
                                const formData = new FormData();
                                const urlExtension = imageUrl.split('.').pop()?.toLowerCase();
                                let fileName = 'performer-image.jpg';
                                if (urlExtension && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(urlExtension)) {
                                    fileName = `performer-image.${urlExtension}`;
                                }
                                
                                formData.append('file', blob, fileName);
                                
                                // Upload to Stash
                                const uploadResponse = await fetch('/upload', {
                                    method: 'POST',
                                    body: formData
                                });
                                
                                if (!uploadResponse.ok) {
                                    throw new Error(`Upload failed: ${uploadResponse.status}`);
                                }
                                
                                const uploadResult = await uploadResponse.json();
                                console.log(`[Performer Rater] Canvas upload successful:`, uploadResult);
                                
                                resolve(uploadResult.id || uploadResult.file_id || uploadResult.image_id);
                                
                            } catch (error) {
                                reject(error);
                            }
                        }, 'image/jpeg', 0.9);
                        
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => {
                    reject(new Error('Failed to load image for canvas conversion'));
                };
                
                // Set the src to trigger loading
                img.src = imageUrl;
            });
            
        } catch (error) {
            console.error('[Performer Rater] Canvas approach failed:', error);
            return null;
        }
    }

    async savePerformerImage(performerId, imageUrl) {
        try {
            console.log(`[Performer Rater] Saving image for performer ${performerId}: ${imageUrl}`);
            
            // Use the direct image field approach (confirmed working)
            console.log(`[Performer Rater] Setting image field directly...`);
            const mutation = `
                mutation PerformerUpdate($input: PerformerUpdateInput!) {
                    performerUpdate(input: $input) {
                        id
                        image_path
                    }
                }
            `;

            const variables = {
                input: {
                    id: performerId,
                    image: imageUrl
                }
            };

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: variables
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`[Performer Rater] Image update response:`, result);
                
                if (!result.errors) {
                    // Store in memory for immediate use
                    if (this.performers[this.currentIndex]) {
                        this.performers[this.currentIndex].customImageUrl = imageUrl;
                    }
                    console.log(`[Performer Rater] Successfully saved image URL for performer ${performerId}`);
                    return result.data;
                } else {
                    throw new Error(`GraphQL errors: ${result.errors[0]?.message}`);
                }
            } else {
                throw new Error(`HTTP error: ${response.status}`);
            }

            
        } catch (error) {
            console.error('[Performer Rater] Error saving performer image:', error);
            console.log('[Performer Rater] Image URL will be stored in memory for this session only');
        }
    }

    exitRating() {
        this.isActive = false;
        
        if (this.ratingOverlay) {
            this.ratingOverlay.remove();
            this.ratingOverlay = null;
        }

        // Remove global key interceptors
        if (this.globalKeyInterceptor) {
            window.removeEventListener('keydown', this.globalKeyInterceptor, true);
            window.removeEventListener('keyup', this.globalKeyInterceptor, true);
            window.removeEventListener('keypress', this.globalKeyInterceptor, true);
            this.globalKeyInterceptor = null;
        }
        if (this.focusTrapHandler) {
            document.removeEventListener('mousedown', this.focusTrapHandler, true);
            this.focusTrapHandler = null;
        }
        
        // Remove highlights
        document.querySelectorAll('.rating-current').forEach(el => {
            el.classList.remove('rating-current');
        });
        
        console.log('[Performer Rater] Rating session ended');
        
        // Force page reload to refresh images and clear cache
        window.location.reload();
    }
}

// Initialize when script loads
window.performerRater = new PerformerRater();

console.log('[Performer Rater] Plugin loaded successfully');