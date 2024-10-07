function generateEmails() {
  // Get values from the form fields
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const domain = document.getElementById('domain').value.trim();
  const year = document.getElementById('year').value.trim();
  const month = document.getElementById('month').value.trim();
  const day = document.getElementById('day').value.trim();
  
  const resultList = document.getElementById('resultList');
  resultList.innerHTML = ''; // Clear previous results

  // Create base combinations
  let combinations = [
    `${firstName}.${lastName}@${domain}`,
    `${firstName}${lastName}@${domain}`,
    `${firstName}_${lastName}@${domain}`,
    `${lastName}${firstName}@${domain}`,
    `${firstName[0]}${lastName}@${domain}`,
    `${firstName[0]}.${lastName}@${domain}`,
    `${firstName}${lastName[0]}@${domain}`,
    `${firstName}.${lastName[0]}@${domain}`,
    `${firstName}-${lastName}@${domain}`,
    `${firstName[0]}_${lastName}@${domain}`,
    `${lastName}.${firstName}@${domain}`,
    `${lastName}_${firstName}@${domain}`
  ];

  // Add combinations with year
  if (year) {
    combinations.push(`${firstName}.${lastName}${year}@${domain}`);
    combinations.push(`${firstName}${lastName}${year}@${domain}`);
    combinations.push(`${firstName}_${lastName}${year}@${domain}`);
    combinations.push(`${firstName}${year}@${domain}`);
    combinations.push(`${lastName}${year}@${domain}`);
    combinations.push(`${firstName[0]}${lastName}${year}@${domain}`);
    combinations.push(`${firstName}.${lastName}_${year}@${domain}`);
  }

  // Add combinations with month and day
  if (month && day) {
    combinations.push(`${firstName}${month}${day}@${domain}`);
    combinations.push(`${firstName}${lastName}${month}${day}@${domain}`);
    combinations.push(`${firstName}.${lastName}${month}${day}@${domain}`);
    combinations.push(`${firstName}_${lastName}${month}${day}@${domain}`);
  }

  // Display combinations in the list
  combinations.forEach(email => {
    const li = document.createElement('li');
    li.textContent = email;
    resultList.appendChild(li);
  });
}

// Function to copy all email combinations to the clipboard
function copyEmails() {
  const resultList = document.getElementById('resultList');
  let emailText = '';
  resultList.querySelectorAll('li').forEach(item => {
    emailText += item.textContent + '\n';
  });

  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = emailText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
  alert('All email combinations copied to clipboard!');
}

