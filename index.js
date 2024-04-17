let participants = [
  {
    name: "Henrique Macedo",
    email: "henrique.macedo@gmail.com",
    dateOfInclusion: new Date(2024, 1, 22, 19, 20),
    dateCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    name: "Davi Nunes",
    email: "davi.nunes@gmail.com",
    dateOfInclusion: new Date(2024, 2, 13, 20, 05),
    dateCheckIn: new Date(2024, 3, 25, 11, 00)
  },
  {
    name: "Maria Silva",
    email: "maria.silva@gmail.com",
    dateOfInclusion: new Date(2024, 2, 5, 14, 30),
    dateCheckIn: null
  },
  {
    name: "João Oliveira",
    email: "joao.oliveira@gmail.com",
    dateOfInclusion: new Date(2024, 2, 18, 10, 15),
    dateCheckIn: new Date(2024, 3, 20, 15, 20)
  },
  {
    name: "Carla Souza",
    email: "carla.souza@gmail.com",
    dateOfInclusion: new Date(2024, 1, 10, 8, 00),
    dateCheckIn: null
  },
  {
    name: "Pedro Santos",
    email: "pedro.santos@gmail.com",
    dateOfInclusion: new Date(2024, 3, 6, 16, 45),
    dateCheckIn: new Date(2024, 3, 12, 18, 00)
  },
  {
    name: "Ana Lima",
    email: "ana.lima@gmail.com",
    dateOfInclusion: new Date(2024, 1, 28, 11, 10),
    dateCheckIn: new Date(2024, 3, 10, 12, 30)
  },
  {
    name: "Lucas Costa",
    email: "lucas.costa@gmail.com",
    dateOfInclusion: new Date(2024, 2, 9, 22, 40),
    dateCheckIn: new Date(2024, 3, 15, 7, 45)
  },
  {
    name: "Juliana Pereira",
    email: "juliana.pereira@gmail.com",
    dateOfInclusion: new Date(2024, 3, 2, 18, 20),
    dateCheckIn: null
  },
  {
    name: "Rafaela Oliveira",
    email: "rafaela.oliveira@gmail.com",
    dateOfInclusion: new Date(2024, 0, 15, 9, 30),
    dateCheckIn: null
  }
]

const createNewParticipant = (participant) => {
  const dateOfInclusion = dayjs(Date.now()).to(participant.dateOfInclusion)

  let dateCheckIn = dayjs(Date.now()).to(participant.dateCheckIn)

  if (participant.dateCheckIn == null) {
    dateCheckIn = `
      <button data-email="${participant.email}" onclick="doCheckIn(event)">
      Confirmar check-in
      </button>
    `
  }
  

  return `
  <tr>
    <td>
        <strong>
          ${participant.name}
        </strong>
        <br>
        <small>
          ${participant.email}
        </small>
    </td>
    <td>${dateOfInclusion}</td>
    <td>${dateCheckIn}</td>
  </tr>
  `
}

const updateList = (participants) => {
  let output = ""

  for (let participant of participants) {
    output = output + createNewParticipant(participant)
  }

  //substituir informação HTML
  document.querySelector('tbody').innerHTML = output

}

updateList(participants)

const addParticipant = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participant = {
    name: formData.get('name'),
    email: formData.get('email'),
    dateOfInclusion: new Date(), 
    dateCheckIn: null
  }

  const participantExists = participants.find(
    (p) => p.email ==participant.email
  )

  if(participantExists) {
    alert('Email já cadastrado!')
    return
  }

  participants = [participant, ...participants]
  updateList(participants)

  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const doCheckIn = (event) => {
  const messageConfirmation = "Tem certeza que deseja fazer o check-in?"

  if(confirm(messageConfirmation) == false) {
    return
  } 

  const participant = participants.find((p) => p.email == event.target.dataset.email
  )

  participant.dateCheckIn = new Date()

  updateList(participants)
}