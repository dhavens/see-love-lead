document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Relationship tab functionality for value detail pages
    const relationshipTabs = document.querySelectorAll('.relationship-tab');
    
    relationshipTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Get parent container
            const container = tab.closest('.value-details');
            
            // Remove active class from all tabs and contents in this container
            container.querySelectorAll('.relationship-tab').forEach(t => t.classList.remove('active'));
            container.querySelectorAll('.relationship-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const relId = tab.getAttribute('data-rel');
            container.querySelector(`#${relId}`).classList.add('active');
        });
    });
    
    // Check for hash in URL to open specific section
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
        
        if (targetElement) {
            // Scroll to element
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 300);
            
            // If it's a relationship section, activate the correct tab
            const relationshipMatch = hash.match(/(self|others|world)$/);
            if (relationshipMatch) {
                const relationship = relationshipMatch[0];
                const container = targetElement.closest('.value-details');
                
                if (container) {
                    container.querySelectorAll('.relationship-tab').forEach(t => t.classList.remove('active'));
                    container.querySelectorAll('.relationship-content').forEach(c => c.classList.remove('active'));
                    
                    container.querySelector(`[data-rel="${relationship}"]`).classList.add('active');
                    container.querySelector(`#${relationship}`).classList.add('active');
                }
            }
        }
    }
});
