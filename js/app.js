const submitForm = document.getElementById('submit-application-form');
const baseUrl = 'https://3e5e-2401-4900-1cb8-283e-e011-3312-8f6-6651.ngrok-free.app';

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  const applicantName = document.getElementById('applicant-name').value;
  const creditScore = document.getElementById('credit-score').value;
  const loanAmount = document.getElementById('loan-amount').value;
  const loanPurpose = document.getElementById('loan-purpose').value;
  const monthlyIncome = document.getElementById('monthly-income').value;
  const monthlyDebt = document.getElementById('monthly-debt').value;
  const employmentStatus = document.getElementById('employment-status').value;
  //const baseUrl = 'https://3.108.223.105:8000';

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
      loader.style.display = 'none';
      console.log(data);
      alert(`Application (ID: ${data.id}) submitted successfully!`);
      submitForm.reset();
    })
    .catch(error => {
      console.error(error);
      loader.style.display = 'none';
      alert('Error submitting application');
    });
});

// Retrieve Application Status Form
const retrieveStatusForm = document.getElementById('retrieve-status-form');
const statusResult = document.getElementById('status-result');

retrieveStatusForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  const applicationId = document.getElementById('application-id').value;

  fetch(`${baseUrl}/api/loan_applications/${applicationId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      loader.style.display = 'none';

      if (data.is_approved === true) {
        statusResult.innerText = `Your application (ID: ${data.id}) has been approved!`;
      } else if (data.is_approved === false) {
        statusResult.innerText = `Your application (ID: ${data.id}) has been rejected.`;
      } else if (data.is_approved === null) {
      } else {
        statusResult.innerText = `Your application  is not found.`;
      }
    })
    .catch(error => {
      console.error(error);
      loader.style.display = 'none';
      alert('Error retrieving application status');
    });
});

// Update/Delete Application Form
const updateForm = document.getElementById('update-application-form');
const updateResult = document.getElementById('update-result');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

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
      loader.style.display = 'none';

      if (data.id) {
        updateResult.innerText = `Application (ID: ${data.id}) updated successfully.`;
      }
      else {
        updateResult.innerText = `Application not found.`;
      }
      updateForm.reset();
    })
    .catch(error => {
      console.error(error);
      loader.style.display = 'none';

      alert('Error updating application');
    });
});

const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', () => {

  const confirmDelete = confirm('Are you sure you want to delete this application?');

  if (confirmDelete) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    const applicationId = document.getElementById('application-id-update').value;
    fetch(`${baseUrl}/api/loan_applications/${applicationId}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(response);
        loader.style.display = 'none';

        updateResult.innerText = `Application (ID: ${applicationId}) deleted successfully.`;
        updateForm.reset();
      })
      .catch(error => {
        console.error(error);
        loader.style.display = 'none';
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