const submitForm = document.getElementById('submit-application-form');

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const applicantName = document.getElementById('applicant-name').value;
  const creditScore = document.getElementById('credit-score').value;
  const loanAmount = document.getElementById('loan-amount').value;
  const loanPurpose = document.getElementById('loan-purpose').value;
  const monthlyIncome = document.getElementById('monthly-income').value;
  const monthlyDebt = document.getElementById('monthly-debt').value;
  const employmentStatus = document.getElementById('employment-status').value;
  const baseUrl = 'http://43.205.214.87:8000';
  console.log(employmentStatus)

  fetch(`${baseUrl}/api/loan_applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      applicant_name: applicantName,
      credit_score: creditScore,
      loan_amount: loanAmount,
      loan_purpose: loanPurpose,
      monthly_income: monthlyIncome,
      monthly_debt: monthlyDebt,
      employment_status: employmentStatus
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Application submitted successfully!');
      submitForm.reset();
    })
    .catch(error => {
      console.error(error);
      alert('Error submitting application');
    });
});

// Retrieve Application Status Form
const retrieveStatusForm = document.getElementById('retrieve-status-form');
const statusResult = document.getElementById('status-result');

retrieveStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const applicationId = document.getElementById('application-id').value;

  fetch(`${baseUrl}/api/loan_applications/${applicationId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.is_approved === true) {
        statusResult.innerText = `Your application (ID: ${data.id}) has been approved!`;
      } else if (data.is_approved === false) {
        statusResult.innerText = `Your application (ID: ${data.id}) has been rejected.`;
      } else {
        statusResult.innerText = `Your application (ID: ${data.id}) is still being processed.`;
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error retrieving application status');
    });
});

// Update/Delete Application Form
const updateForm = document.getElementById('update-application-form');
const updateResult = document.getElementById('update-result');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const applicationId = document.getElementById('application-id-update').value;
  const updateField = document.getElementById('update-field').value;
  const updateValue = document.getElementById('update-value').value;

  fetch(`${baseUrl}/api/loan_applications/${applicationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      [updateField]: updateValue
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateResult.innerText = `Application (ID: ${data.id}) updated successfully.`;
      updateForm.reset();
    })
    .catch(error => {
      console.error(error);
      alert('Error updating application');
    });
});

const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', () => {
  const confirmDelete = confirm('Are you sure you want to delete this application?');

  if (confirmDelete) {
    const applicationId = document.getElementById('application-id-update').value;
    fetch(`${baseUrl}/api/loan_applications/${applicationId}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(response);
        updateResult.innerText = `Application (ID: ${applicationId}) deleted successfully.`;
        updateForm.reset();
      })
      .catch(error => {
        console.error(error);
        alert('Error deleting application');
      });
  }
});
// Slider Outputs
const creditScoreSlider = document.getElementById('credit-score');
const loanAmountSlider = document.getElementById('loan-amount');
const monthlyIncomeSlider = document.getElementById('monthly-income');
const monthlyDebtSlider = document.getElementById('monthly-debt');
const creditScoreOutput = document.getElementById('credit-score-output');
const loanAmountOutput = document.getElementById('loan-amount-output');
const monthlyIncomeOutput = document.getElementById('monthly-income-output');
const monthlyDebtOutput = document.getElementById('monthly-debt-output');

creditScoreSlider.addEventListener('input', () => {
  creditScoreOutput.innerText = creditScoreSlider.value;
});

loanAmountSlider.addEventListener('input', () => {
  loanAmountOutput.innerText = loanAmountSlider.value + ' ₹';
});

monthlyIncomeSlider.addEventListener('input', () => {
  monthlyIncomeOutput.innerText = monthlyIncomeSlider.value + ' ₹';
});

monthlyDebtSlider.addEventListener('input', () => {
  monthlyDebtOutput.innerText = monthlyDebtSlider.value + ' ₹';
});