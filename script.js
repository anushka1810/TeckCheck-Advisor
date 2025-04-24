document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const promptInput = document.querySelector("#prompt");
    const chatContainer = document.querySelector("#chatContainer");
    const submitBtn = document.querySelector("#submitBtn");
    const quickQuestions = document.querySelectorAll(".quick-question");
    const sidebar = document.querySelector("#sidebar");
    const toggleSidebarBtn = document.querySelector("#toggleSidebar");
    const closeSidebarBtn = document.querySelector("#closeSidebar");
    
    // Menu buttons
    const chatBtn = document.querySelector("#chatBtn");
    const guideBtn = document.querySelector("#guideBtn");
    const priceBtn = document.querySelector("#priceBtn");
    const checklistBtn = document.querySelector("#checklistBtn");
    const compareBtn = document.querySelector("#compareBtn");
    
    // API Configuration
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCdmAEwVdrLLbNoJBcUxEB0hLtZ5bwO-XA";
    
    // Initialize chat
    initChat();
    
    // Event Listeners
    promptInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleUserMessage(promptInput.value);
        }
    });
    
    submitBtn.addEventListener("click", () => {
        handleUserMessage(promptInput.value);
    });
    
    // Quick question buttons
    quickQuestions.forEach((button, index) => {
        const questions = [
            "How to check iPhone battery health?",
            "What's a fair price for used MacBook Pro?",
            "What are red flags in used electronics?",
            "Where are the best places to buy refurbished devices?"
        ];
        button.textContent = questions[index];
        button.addEventListener("click", () => {
            handleUserMessage(button.textContent);
        });
    });
    
    // Menu buttons
    chatBtn.addEventListener("click", () => switchTab('chat'));
    guideBtn.addEventListener("click", () => switchTab('guide'));
    priceBtn.addEventListener("click", () => switchTab('price'));
    checklistBtn.addEventListener("click", () => switchTab('checklist'));
    compareBtn.addEventListener("click", () => switchTab('compare'));
    
    // Sidebar toggle for mobile
    toggleSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("active");
    });
    
    closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            e.target !== toggleSidebarBtn && 
            sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
        }
    });
    
    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
        }
    });
    
    function initChat() {
        // Remove welcome message after first interaction
        const welcomeMessage = document.querySelector(".welcome-message");
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
    }
    
    function switchTab(tab) {
        // Update active menu item
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });
        
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
        }
        
        switch(tab) {
            case 'chat':
                chatBtn.classList.add("active");
                displayChatInterface();
                break;
            case 'guide':
                guideBtn.classList.add("active");
                displayBuyingGuide();
                break;
            case 'price':
                priceBtn.classList.add("active");
                displayPriceCheckTool();
                break;
            case 'checklist':
                checklistBtn.classList.add("active");
                displayInspectionChecklist();
                break;
            case 'compare':
                compareBtn.classList.add("active");
                displayRefurbishedComparison();
                break;
        }
    }
    
    function displayChatInterface() {
        // Clear chat container but keep existing messages
        const existingMessages = chatContainer.querySelectorAll('.user-chat-box, .ai-chat-box');
        if (existingMessages.length === 0) {
            const welcomeMessage = document.querySelector(".welcome-message");
            if (welcomeMessage) {
                welcomeMessage.style.display = 'block';
            }
        }
    }
    
    function displayBuyingGuide() {
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Add buying guide content with refurbished section
        const guideHtml = `
            <div class="ai-chat-box">
                <div class="avatar">
                    <i class="fas fa-book"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <h3>Second-Hand Electronics Buying Guide</h3>
                        <p>Follow these tips when purchasing used electronics:</p>
                        
                        <div class="guide-section">
                            <h4><i class="fas fa-mobile-alt"></i> Smartphones</h4>
                            <ul>
                                <li>Check battery health (should be above 80%)</li>
                                <li>Verify IMEI number is clean</li>
                                <li>Test all buttons, ports, and sensors</li>
                                <li>Look for screen burn-in or dead pixels</li>
                            </ul>
                        </div>
                        
                        <div class="guide-section">
                            <h4><i class="fas fa-laptop"></i> Laptops</h4>
                            <ul>
                                <li>Check battery cycle count</li>
                                <li>Test keyboard and trackpad thoroughly</li>
                                <li>Look for signs of liquid damage</li>
                                <li>Verify charger and all ports work</li>
                            </ul>
                        </div>
                        
                        <div class="guide-section">
                            <h4><i class="fas fa-gamepad"></i> Gaming Consoles</h4>
                            <ul>
                                <li>Check controller analog sticks for drift</li>
                                <li>Test disc drive if applicable</li>
                                <li>Verify all USB ports work</li>
                                <li>Check for overheating issues</li>
                            </ul>
                        </div>
                        
                        <div class="guide-section">
                            <h4><i class="fas fa-certificate"></i> Refurbished Devices</h4>
                            <ul>
                                <li>Look for certified refurbished products when possible</li>
                                <li>Verify warranty coverage and return policy</li>
                                <li>Check what components were replaced during refurbishment</li>
                                <li>Research the refurbisher's reputation</li>
                                <li>Compare prices across different refurbishment grades</li>
                            </ul>
                        </div>
                    </div>
                    <div class="chat-meta">TechCheck Advisor • Buying Guide</div>
                </div>
            </div>
        `;
        
        chatContainer.innerHTML = guideHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function displayRefurbishedComparison() {
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Add comparison tool
        const compareHtml = `
            <div class="ai-chat-box">
                <div class="avatar">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <h3>Refurbished Device Comparison</h3>
                        <p>Compare refurbished devices from different sellers:</p>
                        
                        <div class="comparison-tool">
                            <div class="form-group">
                                <label for="compareDevice">Device Model:</label>
                                <input type="text" id="compareDevice" class="form-control" placeholder="e.g. iPhone 13, Dell XPS 15">
                            </div>
                            
                            <div class="filter-options">
                                <div class="filter-group">
                                    <label>Price Range:</label>
                                    <input type="range" id="priceRange" min="0" max="1000" step="50" value="500">
                                    <span id="priceValue">$500</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Refurbishment Grade:</label>
                                    <select id="refurbGrade" class="form-control">
                                        <option value="all">All Grades</option>
                                        <option value="certified">Certified Refurbished</option>
                                        <option value="seller">Seller Refurbished</option>
                                        <option value="premium">Premium Refurbished</option>
                                    </select>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Minimum Warranty:</label>
                                    <select id="warranty" class="form-control">
                                        <option value="0">Any</option>
                                        <option value="30">30 days</option>
                                        <option value="90">90 days</option>
                                        <option value="365">1 year</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button id="searchRefurbBtn" class="btn-primary">
                                <i class="fas fa-search"></i> Search Refurbished Devices
                            </button>
                            
                            <div class="refurb-results" id="refurbResults"></div>
                        </div>
                        
                        <div class="trusted-sellers">
                            <h4>Trusted Refurbishers:</h4>
                            <ul>
                                <li><i class="fas fa-check-circle"></i> Apple Certified Refurbished</li>
                                <li><i class="fas fa-check-circle"></i> Amazon Renewed</li>
                                <li><i class="fas fa-check-circle"></i> Best Buy Refurbished</li>
                                <li><i class="fas fa-check-circle"></i> Back Market</li>
                                <li><i class="fas fa-check-circle"></i> Gazelle</li>
                            </ul>
                        </div>
                    </div>
                    <div class="chat-meta">TechCheck Advisor • Refurbished Comparison</div>
                </div>
            </div>
        `;
        
        chatContainer.innerHTML = compareHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add event listeners
        document.getElementById('priceRange')?.addEventListener('input', function() {
            document.getElementById('priceValue').textContent = '$' + this.value;
        });
        
        document.getElementById('searchRefurbBtn')?.addEventListener('click', searchRefurbishedDevices);
    }
    
    function searchRefurbishedDevices() {
        const device = document.getElementById('compareDevice').value;
        const price = document.getElementById('priceRange').value;
        const grade = document.getElementById('refurbGrade').value;
        const warranty = document.getElementById('warranty').value;
        
        if (!device) {
            alert('Please enter a device model to compare');
            return;
        }
        
        // Show loading
        const resultsDiv = document.getElementById('refurbResults');
        resultsDiv.innerHTML = '<div class="loading-dots"><div></div><div></div><div></div><div></div></div><p>Searching for refurbished devices...</p>';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // This would be replaced with actual API call in production
            const mockResults = generateMockRefurbData(device, price, grade, warranty);
            displayRefurbResults(mockResults);
        }, 1500);
    }
    
    function generateMockRefurbData(device, price, grade, warranty) {
        // Mock data - in a real app this would come from an API
        const basePrice = parseInt(price);
        const sellers = [
            {
                name: "Amazon Renewed",
                price: Math.round(basePrice * (0.8 + Math.random() * 0.2)),
                grade: "certified",
                warranty: 90,
                rating: (4 + Math.random()).toFixed(1),
                url: "https://www.amazon.com",
                device: device
            },
            {
                name: "Best Buy Refurbished",
                price: Math.round(basePrice * (0.75 + Math.random() * 0.2)),
                grade: "premium",
                warranty: 365,
                rating: (4 + Math.random()).toFixed(1),
                url: "https://www.bestbuy.com",
                device: device
            },
            {
                name: "Back Market",
                price: Math.round(basePrice * (0.6 + Math.random() * 0.2)),
                grade: "seller",
                warranty: 30,
                rating: (3.5 + Math.random()).toFixed(1),
                url: "https://www.backmarket.com",
                device: device
            },
            {
                name: "Gazelle",
                price: Math.round(basePrice * (0.7 + Math.random() * 0.2)),
                grade: "certified",
                warranty: 180,
                rating: (4 + Math.random()).toFixed(1),
                url: "https://www.gazelle.com",
                device: device
            },
            {
                name: "Apple Certified Refurbished",
                price: Math.round(basePrice * (0.85 + Math.random() * 0.15)),
                grade: "certified",
                warranty: 365,
                rating: 4.8,
                url: "https://www.apple.com",
                device: device
            }
        ];
        
        // Filter based on selections
        return sellers.filter(seller => {
            if (grade !== 'all' && seller.grade !== grade) return false;
            if (warranty > 0 && seller.warranty < warranty) return false;
            return true;
        });
    }
    
    function displayRefurbResults(results) {
        const resultsDiv = document.getElementById('refurbResults');
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No refurbished devices found matching your criteria. Try adjusting your filters.</p>';
            return;
        }
        
        let html = `<h4>Refurbished ${document.getElementById('compareDevice').value} Options:</h4>`;
        
        // Sort by price (low to high)
        results.sort((a, b) => a.price - b.price);
        
        results.forEach(seller => {
            const gradeBadge = seller.grade === 'certified' ? 'badge-certified' : 
                              seller.grade === 'premium' ? 'badge-premium' : 'badge-seller';
            
            html += `
                <div class="refurb-card">
                    <h4>${seller.name}</h4>
                    <div class="refurb-meta">
                        <span class="${gradeBadge}">${seller.grade.charAt(0).toUpperCase() + seller.grade.slice(1)}</span>
                        <span><i class="fas fa-tag"></i> $${seller.price}</span>
                        <span><i class="fas fa-shield-alt"></i> ${seller.warranty} days warranty</span>
                        <span><i class="fas fa-star"></i> ${seller.rating}/5 rating</span>
                    </div>
                    <a href="${seller.url}" target="_blank" class="btn-primary" style="display: inline-block; text-decoration: none; margin-top: 10px;">
                        <i class="fas fa-external-link-alt"></i> View on ${seller.name.split(' ')[0]}
                    </a>
                </div>
            `;
        });
        
        resultsDiv.innerHTML = html;
    }
    
    function displayPriceCheckTool() {
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Add price check tool
        const priceHtml = `
            <div class="ai-chat-box">
                <div class="avatar">
                    <i class="fas fa-tag"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <h3>Second-Hand Price Check Tool</h3>
                        <p>Get estimated values for used electronics based on condition and age.</p>
                        
                        <div class="price-form">
                            <div class="form-group">
                                <label for="deviceType">Device Type:</label>
                                <select id="deviceType" class="form-control">
                                    <option value="">Select device type</option>
                                    <option value="smartphone">Smartphone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="gaming-console">Gaming Console</option>
                                    <option value="camera">Camera</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="deviceModel">Model/Brand:</label>
                                <input type="text" id="deviceModel" class="form-control" placeholder="e.g. iPhone 12, MacBook Pro 2019">
                            </div>
                            
                            <div class="form-group">
                                <label for="deviceAge">Age (years):</label>
                                <input type="number" id="deviceAge" class="form-control" min="0" max="10" step="0.5">
                            </div>
                            
                            <div class="form-group">
                                <label>Condition:</label>
                                <div class="condition-options">
                                    <label><input type="radio" name="condition" value="mint"> Mint</label>
                                    <label><input type="radio" name="condition" value="good"> Good</label>
                                    <label><input type="radio" name="condition" value="fair"> Fair</label>
                                    <label><input type="radio" name="condition" value="poor"> Poor</label>
                                </div>
                            </div>
                            
                            <button id="estimatePriceBtn" class="btn-primary">
                                <i class="fas fa-calculator"></i> Estimate Price
                            </button>
                        </div>
                    </div>
                    <div class="chat-meta">TechCheck Advisor • Price Check Tool</div>
                </div>
            </div>
        `;
        
        chatContainer.innerHTML = priceHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add event listener for price estimation button
        document.getElementById('estimatePriceBtn')?.addEventListener('click', estimatePrice);
    }
    
    function displayInspectionChecklist() {
        // Clear chat container
        chatContainer.innerHTML = '';
        
        // Add inspection checklist
        const checklistHtml = `
            <div class="ai-chat-box">
                <div class="avatar">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <h3>Second-Hand Electronics Inspection Checklist</h3>
                        <p>Use this checklist when examining a used device:</p>
                        
                        <div class="checklist">
                            <div class="checklist-item">
                                <input type="checkbox" id="check1">
                                <label for="check1">Physical condition matches description</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check2">
                                <label for="check2">All buttons and controls work properly</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check3">
                                <label for="check3">Screen has no cracks, dead pixels, or burn-in</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check4">
                                <label for="check4">Battery holds reasonable charge</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check5">
                                <label for="check5">All ports and connections work</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check6">
                                <label for="check6">Device powers on and boots properly</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check7">
                                <label for="check7">No strange noises or overheating</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check8">
                                <label for="check8">All accessories included as promised</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check9">
                                <label for="check9">Device is not iCloud/Google locked</label>
                            </div>
                            <div class="checklist-item">
                                <input type="checkbox" id="check10">
                                <label for="check10">IMEI/Serial number matches documentation</label>
                            </div>
                        </div>
                        
                        <button id="printChecklistBtn" class="btn-primary">
                            <i class="fas fa-print"></i> Print Checklist
                        </button>
                    </div>
                    <div class="chat-meta">TechCheck Advisor • Inspection Checklist</div>
                </div>
            </div>
        `;
        
        chatContainer.innerHTML = checklistHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add event listener for print button
        document.getElementById('printChecklistBtn')?.addEventListener('click', () => {
            window.print();
        });
    }
    
    function estimatePrice() {
        const deviceType = document.getElementById('deviceType').value;
        const deviceModel = document.getElementById('deviceModel').value;
        const deviceAge = document.getElementById('deviceAge').value;
        const condition = document.querySelector('input[name="condition"]:checked')?.value;
        
        if (!deviceType || !deviceModel || !deviceAge || !condition) {
            alert('Please fill all fields to get a price estimate');
            return;
        }
        
        // In a real app, this would call an API or use a pricing database
        // For demo purposes, we'll simulate a response
        const priceRanges = {
            'smartphone': { mint: '60-75%', good: '45-60%', fair: '30-45%', poor: '15-30%' },
            'laptop': { mint: '55-70%', good: '40-55%', fair: '25-40%', poor: '10-25%' },
            'tablet': { mint: '50-65%', good: '35-50%', fair: '20-35%', poor: '10-20%' },
            'gaming-console': { mint: '60-80%', good: '45-60%', fair: '30-45%', poor: '15-30%' },
            'camera': { mint: '50-70%', good: '35-50%', fair: '20-35%', poor: '10-20%' }
        };
        
        const range = priceRanges[deviceType]?.[condition] || '30-50%';
        const years = parseFloat(deviceAge);
        let depreciation = '';
        
        if (years < 1) depreciation = 'minimal';
        else if (years < 2) depreciation = 'moderate';
        else if (years < 3) depreciation = 'significant';
        else depreciation = 'heavy';
        
        const responseHtml = `
            <div class="ai-chat-box">
                <div class="avatar">
                    <i class="fas fa-tag"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <h3>Price Estimate for ${deviceModel}</h3>
                        <p>Based on the information provided:</p>
                        <ul>
                            <li><strong>Device Type:</strong> ${deviceType}</li>
                            <li><strong>Age:</strong> ${deviceAge} years (${depreciation} depreciation)</li>
                            <li><strong>Condition:</strong> ${condition.charAt(0).toUpperCase() + condition.slice(1)}</li>
                        </ul>
                        
                        <div class="price-estimate">
                            <h4>Estimated Value Range:</h4>
                            <p class="price-range">${range} of original retail price</p>
                            <p class="price-note">Note: Actual market prices may vary based on location, demand, and specific model features.</p>
                        </div>
                        
                        <div class="price-sources">
                            <p>For more accurate pricing, check these resources:</p>
                            <ul>
                                <li><a href="https://www.ebay.com" target="_blank">eBay completed listings</a></li>
                                <li><a href="https://www.swappa.com" target="_blank">Swappa</a> (for smartphones)</li>
                                <li><a href="https://www.gazelle.com" target="_blank">Gazelle</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="chat-meta">TechCheck Advisor • Price Estimate</div>
                </div>
            </div>
        `;
        
        chatContainer.insertAdjacentHTML('beforeend', responseHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function handleUserMessage(message) {
        message = message.trim();
        if (!message) {
            alert("Please enter a message about second-hand electronics");
            return;
        }

        // Basic check for electronics-related keywords
        const electronicsKeywords = [
            'phone', 'laptop', 'tablet', 'console', 'camera', 
            'used', 'second-hand', 'refurbished', 'battery', 
            'price', 'condition', 'inspect', 'evaluate', 'macbook',
            'iphone', 'android', 'pc', 'computer', 'device'
        ];
        
        const isElectronicsRelated = electronicsKeywords.some(keyword => 
            message.toLowerCase().includes(keyword)
        );

        if (!isElectronicsRelated) {
            addMessageToChat(message, 'user');
            addMessageToChat("I specialize only in second-hand electronics advice. Please ask me about used or refurbished tech devices like smartphones, laptops, or gaming consoles.", 'ai');
            promptInput.value = '';
            return;
        }

        // Hide welcome message after first interaction
        const welcomeMessage = document.querySelector(".welcome-message");
        if (welcomeMessage && welcomeMessage.style.display !== 'none') {
            welcomeMessage.style.display = 'none';
        }
        
        // Add user message to chat
        addMessageToChat(message, 'user');
        
        // Clear input
        promptInput.value = '';
        
        // Show loading indicator
        const loadingId = showLoadingIndicator();
        
        // Generate AI response
        generateAIResponse(message, loadingId);
    }
    
    function addMessageToChat(message, sender) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageHtml = `
            <div class="${sender}-chat-box">
                <div class="avatar">
                    ${sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>'}
                </div>
                <div class="chat-content">
                    <div class="${sender}-chat-content">${message}</div>
                    <div class="chat-meta">${sender === 'user' ? 'You' : 'TechCheck Advisor'} • ${timestamp}</div>
                </div>
            </div>
        `;
        
        chatContainer.insertAdjacentHTML('beforeend', messageHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function showLoadingIndicator() {
        const loadingId = 'loading-' + Date.now();
        
        const loadingHtml = `
            <div class="ai-chat-box" id="${loadingId}">
                <div class="avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="chat-content">
                    <div class="ai-chat-content">
                        <div class="loading-dots">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        chatContainer.insertAdjacentHTML('beforeend', loadingHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        return loadingId;
    }
    
    function removeLoadingIndicator(loadingId) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    
    async function generateAIResponse(userMessage, loadingId) {
        try {
            // Prepare the request body with strict context about being a second-hand electronics advisor
            const requestBody = {
                contents: [{
                    parts: [{
                        text: `You are TechCheck, an AI assistant specializing exclusively in second-hand electronics evaluation. 
                        Your role is strictly limited to providing advice about buying, selling, and evaluating used tech devices. 
                        
                        Rules you MUST follow:
                        1. Only respond to questions about second-hand electronics (smartphones, laptops, tablets, gaming consoles, cameras, etc.)
                        2. If asked about unrelated topics, politely decline and redirect to electronics topics
                        3. Focus on practical advice about:
                           - How to inspect used devices
                           - Fair price ranges based on condition and age
                           - Common issues to watch for
                           - Where to buy safely
                           - Comparison of refurbished vs used
                           - Trusted refurbishers
                           - Device-specific evaluation tips
                        
                        User question: ${userMessage}
                        
                        Before answering, verify this question is about second-hand electronics. If not, respond with:
                        "I specialize only in second-hand electronics advice. Please ask me about used or refurbished tech devices."`
                    }]
                }],
                safetySettings: [{
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            };
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error?.message || `HTTP Error: ${response.status}`);
            }
            
            let aiResponse = '';
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                aiResponse = data.candidates[0].content.parts[0].text;
                // Simple formatting cleanup
                aiResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                aiResponse = aiResponse.replace(/\n/g, '<br>');
            } else {
                aiResponse = "I couldn't generate a response. Please try rephrasing your question about second-hand electronics.";
            }
            
            // Remove loading indicator and add AI response
            removeLoadingIndicator(loadingId);
            addMessageToChat(aiResponse, 'ai');
            
        } catch (error) {
            console.error("Error generating response:", error);
            removeLoadingIndicator(loadingId);
            addMessageToChat(`Sorry, I encountered an error while processing your electronics-related question. Please try again.`, 'ai');
        }
    }
});